import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4173;
const DATA_FILE = path.join(__dirname, 'data', 'favorites.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}

// Helper to read data
const readData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        return {};
    }
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading data:", err);
        return {};
    }
};

// Helper to write data
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing data:", err);
    }
};

// API Endpoints

// Get favorites for a user
app.get('/api/favorites/:username', (req, res) => {
    const { username } = req.params;
    const data = readData();
    const favorites = data[username] || [];
    res.json(favorites);
});

// Update favorites for a user
app.post('/api/favorites/:username', (req, res) => {
    const { username } = req.params;
    const { favorites } = req.body;

    if (!Array.isArray(favorites)) {
        return res.status(400).json({ error: 'Favorites must be an array' });
    }

    const data = readData();
    data[username] = favorites;
    writeData(data);

    res.json({ success: true, favorites });
});

// Serve React App for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
