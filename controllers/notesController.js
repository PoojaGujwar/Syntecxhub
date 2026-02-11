const express = require("express")
const Notes = require("../models/notes.model")
const middleWare = require("../middleware/middleware")

const noteRoutes = express.Router()

exports.createNote=async(req,res)=>{
    console.log("heel")
    try{
        const {title, content} = req.body
        const newNote = await Notes({
            title,content,user:req.user.userId
        })
        await newNote.save();
        res.status(201).json({message:"Note created",newNote})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
exports.getNotes= async(req,res)=>{
    try{
        const userId = req.user.userId;
        const notes = await Notes.find({user:userId, isArchived:false}).sort({createdAt:-1});
        res.json(notes)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}
// single note
exports.getSingleNote= async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.userId;
    console.log(noteId)

    const note = await Notes.findOne({ _id: noteId, user: userId , isArchived: false});

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// Update note
exports.updateNote= async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.userId;
    const { title, content } = req.body;

    const note = await Notes.findOne({ _id: noteId, user: userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    await note.save();

    res.json({ message: "Note updated", note });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// Archive note 
exports.archiveNote= async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.userId;

    const note = await Notes.findOne({ _id: noteId, user: userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.isArchived = true;
    await note.save();

    res.json({ message: "Note archived" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
