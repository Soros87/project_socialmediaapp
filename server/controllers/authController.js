import Users from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { compareString, createJWT, hashString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  //Validate fields
  if (!email || !password || !confirmPassword || !firstName || !lastName) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    //Check if the user already exist
    const userExist = await Users.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "Email address already exists" });

    //Check if the password matches the confirm password
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password does not match" });

    //hasPassword uses a salt (random data input) to hash the password - see utils
    const hashedPassword = await hashString(password);

    //Create user in db
    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    //send email verification to user - do this after user is created in db
    sendVerificationEmail(user, res); //FIXME no free version

    //response
    res.status(201).json({
      success: true,
      message: "Sign up successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    next("Please Provide User Credentials");
    return;
  }
  try {
    const existingUser = await Users.findOne({ email });

    //check if User exists in database
    if (!existingUser) {
      next("User doesn't exist. Please sign up an account");
    }
    //check if User is verfied (true or false)
    if (!existingUser?.verified) {
      next(
        "User email is not verified. Check your email account and verify your email"
      );
      return;
    }

    //compare password
    const isMatch = await compareString(password, existingUser.password);

    if (!isMatch) {
      next("Invalid email or password");
      return;
    }
    //For security reasons to prevent the hashed password from being sent back in the response when logging in.
    existingUser.password = undefined;

    const token = createJWT(existingUser?._id);
    //response
    res.status(201).json({
      success: true,
      message: "Login successfully",
      existingUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
