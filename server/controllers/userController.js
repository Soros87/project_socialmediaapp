import Users from "../models/userModel.js";
import mongoose from "mongoose";
import { compareString, createJWT, hashString } from "../utils/index.js";
import Verification from "../models/emailVerificationModel.js";
import { resetPasswordLink } from "../utils/sendEmail.js";
import PasswordReset from "../models/passwordResetModel.js";

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

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  // check if user exists
  const user = await Users.findOne({ email });

  try {
    if (!user) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Email address not found" });
    }

    //if user exists send password reset email to user
    const existingRequest = await PasswordReset.findOne({ email });
    if (existingRequest) {
      if (existingRequest.expiresAt > Date.now()) {
        return res.status(201).json({
          status: "PENDING",
          message: "Reset password link has already been sent to your email.",
        });
      }
      //if existing request and token not expired delete existing request
      await PasswordReset.findOneAndDelete({ email });
    }
    await resetPasswordLink(user, res); //from util sendEmail.js
    res.status(201).json({
      message: "Successful. Reset password link has been sent to your email.",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  //this comes from the sendEmail.js resetPasswordLink method when the user clicks the link
  const { userId, token } = req.params;

  try {
    // find record
    const user = await Users.findById(userId);

    //check if user exists
    if (!user) {
      const message = "Invalid password reset link. Try again";
      res.redirect(`/users/resetpassword?status=error&message=${message}`);
    }

    const resetPassword = await PasswordReset.findOne({ userId });

    if (!resetPassword) {
      const message = "Invalid password reset link. Try again";
      res.redirect(`/users/resetpassword?status=error&message=${message}`);
    }

    const { expiresAt, token: resetToken } = resetPassword;

    if (expiresAt < Date.now()) {
      const message = "Reset Password link has expired. Please try again";
      res.redirect(`/users/resetpassword?status=error&message=${message}`);
    } else {
      const isMatch = await compareString(token, resetToken);

      if (!isMatch) {
        const message = "Invalid reset password link. Please try again";
        res.redirect(`/users/resetpassword?status=error&message=${message}`);
      } else {
        res.redirect(`/users/resetpassword?type=reset&id=${userId}`);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const { userId } = req.params;

    //Check if the password matches the confirm password
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password does not match" });

    const hashedpassword = await hashString(password);

    const user = await Users.findByIdAndUpdate(
      { _id: userId },
      { password: hashedpassword }
    );

    if (user) {
      await PasswordReset.findOneAndDelete({ userId });

      res.status(200).json({
        ok: true,
        message: "Password reset successfully updated",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
