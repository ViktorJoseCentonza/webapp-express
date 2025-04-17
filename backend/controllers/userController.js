const connection = require('../data/db')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


function index(req, res) {
}

function show(req, res) {
}

function store(req, res) {
    //ai assisted
    const { username, email, password } = req.body;

    connection.execute('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            connection.execute(
                'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
                [username, email, hashedPassword],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Failed to register user' });
                    }

                    return res.status(201).json({
                        message: 'User registered successfully',
                    });
                }
            );
        } catch (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }
    });
}

async function login(req, res) {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    // Check if user exists
    connection.execute('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // User found, now compare the password
        const user = result[0]; // Assuming the first row is the user
        console.log(user)
        try {
            const isMatch = await bcrypt.compare(password, user.password_hash);

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Create a JWT token
            const payload = {
                id: user.id,
                username: user.username,
                email: user.email
            };

            const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }); // You should store the secret securely

            // Send token in response
            res.status(200).json({
                message: 'Login successful',
                token: token
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error comparing passwords' });
        }
    });
}

function update(req, res) {
}

function modify(req, res) {
}

function destroy(req, res) {
}

module.exports = {
    index,
    show,
    store,
    login,
    update,
    modify,
    destroy
}