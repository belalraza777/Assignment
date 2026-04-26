const jwt = require("jsonwebtoken");

function verifyAuth(req, res, next) {
    const isApiRequest = req.originalUrl.startsWith("/api/");

    // Get token from cookie or header
    let token = req.cookies.token;

    // If no token in cookie, check Authorization header
    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7); // Remove 'Bearer ' prefix
        }
    }

    if (!token) {
        if (!isApiRequest) {
            return res.redirect("/login");
        }
        return res.status(401).json({ error: 'No token provided' });
    }


    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (!isApiRequest) {
                return res.redirect("/login");
            }
            return res.status(403).json({
                success: false,
                error: "Invalid or expired token. Please log in again."
            });
        }
        req.user = user;  // attach decoded user info to request
        next();
    });
}

module.exports = { verifyAuth };