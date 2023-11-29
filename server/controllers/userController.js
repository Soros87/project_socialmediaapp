import Users from "../models/userModel.js";
import mongoose from "mongoose";
import { compareString, createJWT, hashString } from "../utils/index.js";
import Verification from "../models/emailVerificationModel.js";

export const verifyEmail = async (req, res) => {
  //user is directed to the link = APP_URL + "users/verify/" + _id + "/" + token;
  //extract token and id from parameters
  const { userId, token } = req.params;

  try {
    //Check if the user exists
    const result = await Verification.findOne({ userId });

    //extract the token and the expiration from the db
    if (result) {
      const { expiresAt, token: hashedToken } = result;

      // check whether token has expires (if expiresAt is > Date.now() = expired)
      if (expiresAt < Date.now()) {
        Verification.findOneAndDelete({ userId })
          .then(() => {
            Users.findOneAndDelete({ _id: userId })
              .then(() => {
                const message = "Verification token has expired.";
                res.redirect(`/users/verified?status=error&message=${message}`);
              })
              .catch((err) => {
                res.redirect(`/users/verified?status=error&message=${message}`);
              });
          })
          .catch((error) => {
            console.log(error);
            res.redirect(`/users/verified?message=${message}`);
          });
      } else {
        //token valid
        compareString(token, hashedToken)
          .then((isMatch) => {
            if (isMatch) {
              Users.findOneAndUpdate({ _id: userId }, { verified: true })
                .then(() => {
                  Verification.findOneAndDelete({ userId }).then(() => {
                    const message = "Email verified successfully";
                    res.redirect(
                      `/users/verified?status=success&message=${message}`
                    );
                  });
                })
                .catch((err) => {
                  console.log(err);
                  const message = "Verification failed or link is invalid";
                  res.redirect(
                    `/users/verified?status=error&message=${message}`
                  );
                });
            } else {
              // invalid token
              const message = "Verification failed or link is invalid";
              res.redirect(`/users/verified?status=error&message=${message}`);
            }
          })
          .catch((error) => {
            console.log(error);
            res.redirect(`/users/verified?message=${error.message}`);
          });
      }
    } else {
      const message = "Invalid verification link. Try again later.";
      res.redirect(`/users/verified?status=error&message=${message}`);
    }
  } catch (error) {
    console.log(error);
    res.redirect(`/users/verified?message=${error.message}`);
  }
};
