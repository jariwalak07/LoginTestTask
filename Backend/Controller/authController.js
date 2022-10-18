const bcrypt = require("bcrypt");
require("dotenv").config();
require("../DB/db");
const jwt = require("jsonwebtoken");
let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
let pass_regex = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
);

async function register(params) {
  try {
    if (!params.email || !params.password)
      throw { error: "Email or Password invalid" };
    if (!regex.test(params.email)) throw { error: "Email is Not valid" };
    if (!pass_regex.test(params.password))
      throw {
        error:
          "Password is minimum 8 characters which contain at least one numeric digit,one capital character and one special character ",
      };
    if (await db.User.findOne({ where: { email: params.email } })) {
      throw { error: "Email is already registered" };
    }
    const user = new db.User(params);
    user.password = await bcrypt.hash(params.password, 4);
    const response = await user.save();
    const token = jwt.sign(
      { user_id: response.id, token: response.token },
      process.env.JWT_SECRET_KEY
    );
    user.token = token;
    try {
      await db.User.update({ token: token }, { where: { id: response.id } });
    } catch (err) {}
    return { response: response };
  } catch (error) {
    return error;
  }
}

async function login(params) {
  try {
    const user = await db.User.findOne({ where: { email: params.email } });
    if (user) {
      const bcryptPassword = await bcrypt.compare(
        params.password,
        user.password
      );
      if (bcryptPassword) {
        return { message: "User Login Successfully" };
      } else {
        return { error: "Invalid Email or Password" };
      }
    }
  } catch (error) {
    return { error: "Invalid Email or Password" };
  }
}
module.exports = { register, login };
