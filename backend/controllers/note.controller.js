const Note = require("../models/note.model");

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).select("-user");

    res.status(200).json({
      success: true,
      message: "Successfully fetched the notes",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch all note. Try again",
    });
  }
};

const createNote = async (req, res) => {
  try {
    const { note, color } = req.body;

    if (!note || !color) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }

    const newNote = await Note.create({ note, color, user: req.user._id });

    if (!newNote) {
      return res.status(500).json({
        success: false,
        message: "Unable to create note. Try again",
      });
    }

    res.status(201).json({
      success: true,
      message: "Successfully created the note",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create note. Try again",
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: true,
        message: "Note not found",
      });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted the note",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete note. Try again",
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { noteId, color, newNote } = req.body;

    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({
        success: true,
        message: "Note not found",
      });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    if (color) {
      note.color = color;
    }

    if (newNote) {
      note.note = newNote;
    }

    await note.save();
    res.status(200).json({
      success: true,
      message: "Successfully updated the note",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Unable to update note. Try again",
    });
  }
};

module.exports = {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
};
