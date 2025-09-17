import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: false,
      default: "",
    },
    summary: {
      type: String,
      default: "",
    },
    elaboration: {
      type: String,
      default: "",
    },
    tags: {
      type: [String], // Defines an array of strings
      default: [],   // Defaults to an empty array
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;

