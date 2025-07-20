const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '50mb' })); // Increase limit for large files

// Endpoint to save files
app.post('/api/save-audio-files', (req, res) => {
    const { files } = req.body;
    files.forEach(file => {
        const base64Data = file.data.replace(/^data:audio\/[^;]+;base64,/, '');
        fs.writeFile(path.join('uploads', file.name), base64Data, 'base64', (err) => {
            if (err) {
                console.error(`Error saving file ${file.name}:`, err);
                return res.status(500).json({ success: false });
            }
        });
    });
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
