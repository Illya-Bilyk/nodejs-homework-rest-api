const express = require("express");
const { validateBody } = require("../../middlewares");
const { schema } = require("../../models/user");
const verify = require("../../middlewares/verify");
const {
  signUp,
  signIn,
  getCurrent,
  logout,
} = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schema.signUpSchema), signUp);
router.post("/login", validateBody(schema.signInSchema), signIn);
router.get("/current", verify, getCurrent);
router.post("/logout", verify, logout);

module.exports = router;
