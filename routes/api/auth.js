const express = require("express");
const { validateBody, upload } = require("../../middlewares");
const { schema } = require("../../models/user");
const verify = require("../../middlewares/verify");
const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schema.signUpSchema), ctrl.signUp);
router.post("/login", validateBody(schema.signInSchema), ctrl.signIn);
router.get("/current", verify, ctrl.getCurrent);
router.post("/logout", verify, ctrl.logout);
router.patch("/avatar", verify, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
