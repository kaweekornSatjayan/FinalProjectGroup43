// --- CONFIGURATION ---
// The full URL to your running backend server
const API_URL = "http://54.226.46.73:3222";

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const notesList = document.getElementById('notesList');
    const newNoteBtn = document.getElementById('newNoteBtn');
    const editorModal = document.getElementById('editor');
    const titleInput = document.getElementById('title');
    const bodyTextarea = document.getElementById('body');
    const tagsContainer = document.getElementById('tagsContainer');
    const newTagInput = document.getElementById('newTagInput');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const generateTitleBtn = document.getElementById('generateTitleBtn');
    const elaborateBtn = document.getElementById('elaborateBtn');
    const searchBar = document.getElementById('searchBar');
    const loadingPopup = document.getElementById('loadingPopup');

    // Read Mode Modal Elements
    const readModal = document.getElementById('readModal');
    const readTitle = document.getElementById('readTitle');
    const readBody = document.getElementById('readBody');
    const readTags = document.getElementById('readTags');
    const readCloseBtn = document.getElementById('readCloseBtn');
    const readEditBtn = document.getElementById('readEditBtn');

    let currentNoteId = null;

    // --- Utility Functions ---
    // --- Custom Alert Function ---
    function customAlert(message) {
        alert(message);
    }

    // Fetch and render notes from the server
    async function fetchNotes() {
        try {
            const response = await fetch(`${API_URL}/api/notes`);
            const notes = await response.json();
            renderNotes(notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
            alert('Failed to load notes. Please check the server connection.');
        }
    }

    // Render notes to the DOM
    function renderNotes(notes) {
        if (!notesList) {
            console.error("Error: The 'notesList' element was not found in the DOM.");
            return;
        }

        notesList.innerHTML = '';
        if (notes.length === 0) {
            notesList.innerHTML = '<p style="text-align: center; color: #777;">No notes found. Click "Add Note" to create one!</p>';
            return;
        }

        notes.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';
            noteItem.dataset.id = note._id;

            const tagsHtml = note.tags.map(tag => `<span class="note-tag">${tag}</span>`).join('');

            noteItem.innerHTML = `
                <h3 class="note-title">${note.title}</h3>
                <div class="note-tags">${tagsHtml}</div>
                <p class="note-body">${note.body}</p>
            `;
            // Updated event listener to open read mode
            noteItem.addEventListener('click', () => openReadMode(note));
            notesList.appendChild(noteItem);
        });
    }

    // Filter notes based on search query
    searchBar.addEventListener('input', async (e) => {
        const query = e.target.value.toLowerCase();
    const response = await fetch(`${API_URL}/api/notes`);
        const allNotes = await response.json();

        const filteredNotes = allNotes.filter(note =>
            note.title.toLowerCase().includes(query) ||
            note.body.toLowerCase().includes(query) ||
            note.tags.some(tag => tag.toLowerCase().includes(query))
        );
        renderNotes(filteredNotes);
    });

    // --- NEW: Read Mode Functions ---
    function openReadMode(note) {
        readTitle.textContent = note.title;
        readBody.textContent = note.body;
        readTags.innerHTML = note.tags.map(tag => `<span class="note-tag">${tag}</span>`).join('');
        readModal.classList.add('show');

        // Set up the edit button to open the editor
        readEditBtn.onclick = () => {
            closeReadMode();
            openEditor(note);
        };

        // NEW: Close modal when clicking on the overlay
        readModal.addEventListener('click', (e) => {
            if (e.target.id === 'readModal') {
                closeReadMode();
            }
        });
    }

    function closeReadMode() {
        readModal.classList.remove('show');
    }

    // --- Editor Functions ---
    function openEditor(note = null) {
        if (note) {
            currentNoteId = note._id;
            titleInput.value = note.title;
            bodyTextarea.value = note.body;

            // Populate the new tags container
            tagsContainer.innerHTML = '';
            note.tags.forEach(tag => tagsContainer.appendChild(createTagElement(tag)));

            saveBtn.textContent = 'Save Changes';
            deleteBtn.style.display = 'inline-block';
        } else {
            currentNoteId = null;
            titleInput.value = '';
            bodyTextarea.value = '';
            tagsContainer.innerHTML = '';
            newTagInput.value = '';
            saveBtn.textContent = 'Add Note';
            deleteBtn.style.display = 'none';
        }
        editorModal.classList.add('show');
    }

    function closeEditor() {
        editorModal.classList.remove('show');
    }

    // --- Tag Handling Functions ---
    function createTagElement(tagText) {
        const tagElement = document.createElement('span');
        tagElement.className = 'note-tag editable-tag';
        tagElement.textContent = tagText;
        tagElement.onclick = () => tagElement.remove(); // Click to remove
        return tagElement;
    }

    newTagInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && newTagInput.value.trim() !== '') {
            e.preventDefault(); // Prevents form submission
            const newTag = newTagInput.value.trim();
            tagsContainer.appendChild(createTagElement(newTag));
            newTagInput.value = '';
        }
    });

    // --- Pop-up Utility Functions ---
    function showPopup() {
        loadingPopup.classList.add('show');
    }

    function hidePopup() {
        loadingPopup.classList.remove('show');
    }

    // --- Event Listeners ---
    if (newNoteBtn) newNoteBtn.addEventListener('click', () => openEditor());
    if (cancelBtn) cancelBtn.addEventListener('click', closeEditor);
    if (readCloseBtn) readCloseBtn.addEventListener('click', closeReadMode);

    // Save/Update Note
    if (saveBtn) saveBtn.addEventListener('click', async () => {
        const currentTags = Array.from(tagsContainer.querySelectorAll('.note-tag'))
                               .map(tagEl => tagEl.textContent.trim());

        const noteData = {
            title: titleInput.value,
            body: bodyTextarea.value,
            tags: currentTags,
        };

        const method = currentNoteId ? 'PUT' : 'POST';
    const url = currentNoteId ? `${API_URL}/api/notes/${currentNoteId}` : `${API_URL}/api/notes`;

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(noteData),
            });
            if (response.ok) {
                closeEditor();
                fetchNotes();
            } else {
                throw new Error('Failed to save note.');
            }
        } catch (error) {
            console.error('Error saving note:', error);
            alert('An error occurred while saving the note.');
        }
    });

    // Delete Note
    if (deleteBtn) deleteBtn.addEventListener('click', async () => {
        if (currentNoteId && confirm('Are you sure you want to delete this note?')) {
            try {
                const response = await fetch(`${API_URL}/api/notes/${currentNoteId}`, { method: 'DELETE' });
                if (response.ok) {
                    closeEditor();
                    fetchNotes();
                } else {
                    throw new Error('Failed to delete note.');
                }
            } catch (error) {
                console.error('Error deleting note:', error);
                alert('An error occurred while deleting the note.');
            }
        }
    });

    // --- LLM Buttons ---
    // ...existing code...
    async function llmBtnHandler(btn, endpoint, updateField, successMsg) {
        if (!currentNoteId) {
            customAlert('Please select or open a note before using this feature.');
            return;
        }
    btn.textContent = 'Processing...';
    btn.disabled = true;
    showPopup();
        try {
            const res = await fetch(`${API_URL}/api/notes/${currentNoteId}/${endpoint}`, {
                method: 'POST',
            });
            const data = await res.json();
            updateField(data.aiResponse);
            // No alert for summarize, generate title, elaborate
        } catch (err) {
            console.error(err);
            customAlert('Failed to process LLM action.');
        } finally {
            btn.textContent = endpoint.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
            btn.disabled = false;
            hidePopup();
            fetchNotes();
        }
    }

    if (summarizeBtn) summarizeBtn.onclick = () =>
        llmBtnHandler(
            summarizeBtn,
            'summarize',
            aiResponse => { bodyTextarea.value = aiResponse; }
        );

    if (generateTitleBtn) generateTitleBtn.onclick = () =>
        llmBtnHandler(
            generateTitleBtn,
            'generate-title',
            aiResponse => { titleInput.value = aiResponse; }
        );

    if (elaborateBtn) elaborateBtn.onclick = () =>
        llmBtnHandler(
            elaborateBtn,
            'elaborate',
            aiResponse => { bodyTextarea.value = aiResponse; }
        );

    // --- Initial Load ---
    fetchNotes();
});