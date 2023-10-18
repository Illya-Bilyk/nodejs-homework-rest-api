const express = require("express");
const {
  getAll,
  getById,
  add,
  removeContact,
  updateById,
  updateStatusContact,
} = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { schema } = require("../../models/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(schema.addSchema), add);

router.delete("/:contactId", isValidId, removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schema.addSchema),
  updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schema.favoriteSchema),
  updateStatusContact
);

module.exports = router;
