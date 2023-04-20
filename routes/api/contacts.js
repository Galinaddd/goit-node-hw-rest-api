const express = require("express");
const ctrl = require("../../controllers/contacts");
const {
  validateBody,
  isValidId,
  validateByJoiSchema,
  authenticate,
} = require("../../middlewares");
const { contactSchemas } = require("../../models");

const router = express.Router();

// router.use(authenticate);

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  // validateBody,
  // validateByJoiSchema(contactSchemas.addSchema),
  ctrl.add
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody,
  validateByJoiSchema(contactSchemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody,
  validateByJoiSchema(contactSchemas.updateSchema),
  ctrl.updateById
);

module.exports = router;
