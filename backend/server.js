const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3002;
const DB_FILE = path.join(__dirname, 'database.json');

app.use(cors());
app.use(bodyParser.json());

// Helper to read database
const readDb = () => {
    if (!fs.existsSync(DB_FILE)) {
        return { users: [], budgets: {} };
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
};

// Helper to write database
const writeDb = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Initialize DB if not exists
if (!fs.existsSync(DB_FILE)) {
    writeDb({
        users: [{ email: 'hire-me@anshumat.org', password: 'HireMe@2025!' }],
        budgets: {} // Keyed by user email
    });
}

// Login Endpoint
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    const db = readDb();
    const user = db.users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ success: true, user: { email: user.email } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Sync Endpoint
app.post('/budget/sync', (req, res) => {
    const { email, budget, timestamp } = req.body;
    if (!email || !budget) {
        return res.status(400).json({ success: false, message: 'Missing data' });
    }

    const db = readDb();

    // Simple conflict resolution: Last Write Wins (based on server receipt or client timestamp)
    // Here we just overwrite for simplicity as per "Push local data -> server" requirement
    db.budgets[email] = { ...budget, lastSynced: new Date().toISOString() };

    writeDb(db);
    console.log(`Synced data for ${email}`);
    res.json({ success: true, timestamp: new Date().toISOString() });
});

// Get Latest Endpoint
app.get('/budget/latest', (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email required' });
    }

    const db = readDb();
    const budget = db.budgets[email];

    if (budget) {
        res.json({ success: true, budget });
    } else {
        res.json({ success: true, budget: null }); // No data yet
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
