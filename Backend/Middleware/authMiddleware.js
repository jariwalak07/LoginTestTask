const jwt = require("jsonwebtoken");
require("../DB/db");
require("dotenv").config();
const Auth = async (req, res, next) => {
  try { 
    const token = await req.header("Authorization").replace("Bearer ", "");
    const decode_token = jwt.decode(token);
    const UserFound = await db.User.findOne({
      id: decode_token.user_id
    });
    if (!UserFound) {
      throw new Error("Please Authenticate....");
    }
    req.User = UserFound;
    next();
  } catch (e) {
    res.status(401).send("Please Authenticate....");
  }
};
module.exports = Auth;
