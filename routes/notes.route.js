const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/middleware");
const notesController = require("../controllers/notesController");

router.post("/", authMiddleware, notesController.createNote);
router.get("/", authMiddleware, notesController.getNotes);
router.get("/:id", authMiddleware, notesController.getSingleNote);
router.put("/:id", authMiddleware, notesController.updateNote);
router.delete("/:id", authMiddleware, notesController.archiveNote);

module.exports = router;
