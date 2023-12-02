import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    next("Authentication== failed");
  }

  const token = authHeader?.split(" ")[1];

  try {
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

    //req.body.user can be replaced by req.userId
    req.body.user = {
      userId: userToken.userId, //userId is a string not the Id object. However req.body.user is an object with user details
    };

    next();
  } catch (error) {
    console.log(error);
    next("Authentication failed");
  }
};

export default userAuth;
