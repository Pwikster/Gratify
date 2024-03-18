import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { id: decoded.id } // Ensuring req.user is an object with an id property
        next()
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" })
    }
}

export default authMiddleware
