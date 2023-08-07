const jwt = require("jsonwebtoken");

// Middle code obtained from this article:
// https://medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8
module.exports = (req, res, next) => {
    //get the token from the header if present
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    //if no token found, return response (without going to the next middelware)
    if (!token) return res.status(401).send("Access denied.");

    try {
        //if can verify the token, set req.user and pass to next middleware
        const decoded = jwt.verify(token, process.env.PRIV_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        //if invalid token
        res.status(400).send("Invalid token.");
    }
};