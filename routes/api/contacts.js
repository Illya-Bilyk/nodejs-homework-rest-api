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
const verify = require("../../middlewares/verify");

const router = express.Router();

router.get("/", verify, getAll);

router.get("/:contactId", verify, isValidId, getById);

router.post("/", verify, validateBody(schema.addSchema), add);

router.delete("/:contactId", verify, isValidId, removeContact);

router.put(
  "/:contactId",
  verify,
  isValidId,
  validateBody(schema.addSchema),
  updateById
);

router.patch(
  "/:contactId/favorite",
  verify,
  isValidId,
  validateBody(schema.favoriteSchema),
  updateStatusContact
);

module.exports = router;
