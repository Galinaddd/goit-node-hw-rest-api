const express = require("express");

const router = express.Router();
const {
  validateByJoiSchema,
  authenticate,
  upload,
} = require("../../middlewares");
const { userSchemas } = require("../../models");
const ctrl = require("../../controllers/users");

router.post(
  "/register",
  validateByJoiSchema(userSchemas.registerSchema),
  ctrl.register
);
router.post("/login", validateByJoiSchema(userSchemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, ctrl.subscriptionUpdate);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
