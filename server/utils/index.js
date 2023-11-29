import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//hash String or password
export const hashString = async (useValue) => {
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(useValue, salt);
  return hashedpassword;
};

//compare password to database
export const compareString = async (userPassword, password) => {
  const isMatch = await bcrypt.compare(userPassword, password);
  return isMatch;
};

//create JSON WEBTOKEN
export function createJWT(id) {
  return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
}
