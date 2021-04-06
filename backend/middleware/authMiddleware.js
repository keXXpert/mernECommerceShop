import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protect = asyncHandler(async (req, res, next) => {
    const header = req.headers.authorization
    let token

    if (header && header.startsWith('Bearer ')) {
        try {
            token = header.substr(7)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (err) {
            console.error(err)
            res.status(401)
            throw new Error('Not authorized, token failed!')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token!')
    }
})

export const admin = (req, res, next) => {
    if (req.user?.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin!')
    }
}