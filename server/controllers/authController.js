import Users from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { compareString, createJWT, hashPassword } from "../utils/index.js";
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
    const hashedPassword = await hashPassword(password);

    //send email verification to user
    sendVerificationEmail(user, res);

    //Create user in db
    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
