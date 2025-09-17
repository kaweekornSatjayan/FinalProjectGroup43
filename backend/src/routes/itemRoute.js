import express from "express";
// --- CORRECTED FILENAME HERE ---
import * as itemController from "../controllers/itemController.js";

// Initialize the router
const router = express.Router();

// --- Standard CRUD Routes ---

// @desc    Create a new note with content
router.post("/", itemController.createNote);

// @desc    Create a new note with only a title
router.post("/title-only", itemController.createNoteWithTitleOnly);

// @desc    Get all notes
router.get("/", itemController.getAllNotes);

// @desc    Get a single note by its ID
router.get("/:id", itemController.getNoteById);

// @desc    Update an existing note
router.put("/:id", itemController.updateNote);

// @desc    Delete a note by its ID
router.delete("/:id", itemController.deleteNote);


// --- LLM Integration Routes ---
// LLM endpoint for frontend AI features
router.post('/llm', async (req, res) => {
		try {
			const { type, prompt } = req.body;
			let aiResponse;
			if (!prompt || !type) {
				return res.status(400).json({ message: 'Prompt and type are required.' });
			}
			if (type === 'summarize') {
				aiResponse = await itemController.callLlmApi(`Summarize the following text concisely: "${prompt}"`);
			} else if (type === 'generate-title') {
				const title = await itemController.callLlmApi(`Generate a short, relevant title (less than 5 words) for this text: "${prompt}"`);
				aiResponse = title.replace(/"/g, '').trim();
			} else if (type === 'elaborate') {
				aiResponse = await itemController.callLlmApi(`Elaborate on the following idea and expand it into a full, well-written paragraph: "${prompt}"`);
			} else {
				return res.status(400).json({ message: 'Invalid LLM type.' });
			}
			res.status(200).json({ aiResponse });
		} catch (error) {
			res.status(500).json({ message: 'LLM request failed.', error: error.message });
		}
});


// Get all notes
router.get("/", itemController.getAllNotes);

// Create a new note
router.post("/", itemController.createNote);

// Get a single note by ID
router.get("/:id", itemController.getNoteById);

// Update a note by ID
router.put("/:id", itemController.updateNote);

// Delete a note by ID
router.delete("/:id", itemController.deleteNote);

// Summarize a note
router.post("/:id/summarize", itemController.summarizeNoteContent);

// Generate a title for a note
router.post("/:id/generate-title", itemController.generateNoteTitle);

// Elaborate a note
router.post("/:id/elaborate", itemController.elaborateNoteContent);

export default router;
