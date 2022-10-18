const { response } = require("express");
const express = require("express");
const { register, login } = require("../Controller/authController");
const router = express.Router();
router.post("/login", async (req, res) => {

  await login({ email: req.body.email, password: req.body.password })
    .then((response) => {
      if (response.message) {
        res.status(200).send({ message: response.message });
      } else if (response.error) {
        res.status(400).send({ error: response.error });
      }
    })
    .catch((error) => console.log("error", error));
});
router.post("/register", async (req, res) => {
  await register({ email: req.body.email, password: req.body.password })
    .then((response) => {
      if (response.error) {
        res.status(401).send({ message: response.error });
      } else {
        res.status(201).send({ message: response });
      }
    })
    .catch((error) => console.log("error", error));
});

module.exports = router;
