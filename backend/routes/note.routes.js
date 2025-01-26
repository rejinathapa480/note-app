const express = require("express");

const {
  getAllNotes,
  deleteNote,
  createNote,
  updateNote,
} = require("../controllers/note.controller");

const router = express.Router();

router.get("/", getAllNotes);
router.post("/create", createNote);
router.patch("/update", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
