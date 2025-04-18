const jwt = require('jsonwebtoken');

// Token verification middleware
function authorize(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log("authorization began!")
    if (!authHeader) {
        console.log("authorization failed! no token provided");
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        console.log("authorization failed! no token in the header!")
        return res.status(401).json({ message: 'Token is missing' });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log("token verification begun...")
        if (err) {
            console.log("the token is not valid!")
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        // Store the decoded user info in the request object
        req.user = decoded;
        next(); // Allow the request to continue to the next middleware/handler
    });
}

module.exports = authorize;
