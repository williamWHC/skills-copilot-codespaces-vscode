// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory database for comments
let comments = [];

// Endpoint to get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Endpoint to add a new comment
app.post('/comments', (req, res) => {
    const { name, text } = req.body;
    if (!name || !text) {
        return res.status(400).json({ error: 'Name and text are required' });
    }
    const newComment = { id: comments.length + 1, name, text };
    comments.push(newComment);
    res.status(201).json(newComment);
});

// Endpoint to delete a comment by ID
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const index = comments.findIndex(comment => comment.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    const deletedComment = comments.splice(index, 1);
    res.json(deletedComment);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});