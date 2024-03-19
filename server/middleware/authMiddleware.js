// We start by importing jwt from the 'jsonwebtoken' package, which we'll use to verify the token.
import jwt from 'jsonwebtoken'

// authMiddleware is defined as a function that takes the usual Express middleware arguments: req (request), res (response), and next (a callback to the next middleware in the stack).
const authMiddleware = (req, res, next) => {
    // We attempt to extract the token from the Authorization header. The format we expect is "Bearer [token]".
    // The ?. operator safely attempts to split the header string, returning undefined if the header is not set.
    const token = req.headers.authorization?.split(' ')[1]

    // If there's no token, we immediately return a 401 Unauthorized response.
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" })
    }

    try {
        // If there is a token, we try to verify it using jwt.verify(), passing the token and the secret key.
        // The secret key is what was used to sign the tokens, ensuring they're valid and were issued by our server.
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        // Assuming the token is valid, we add a user object to the req object with the user's id.
        // This is usually used in subsequent middleware or route handlers to identify the requesting user.
        req.user = { id: decoded.id } 
        
        // If everything checks out, we call next() to pass control to the next middleware in the stack.
        next()
    } catch (error) {
        // If jwt.verify() throws an error, it means the token is invalid. We catch this error and return a 401 response.
        res.status(401).json({ message: "Token is not valid" })
    }
}

// Finally, we make authMiddleware available for import elsewhere in our application.
export default authMiddleware
