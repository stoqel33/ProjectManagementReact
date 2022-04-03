import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization as string
        if (!authHeader) return res.status(401).json({ message: 'You are not authenticated' })

        const token: string = authHeader?.split(' ')[1]

        verify(token, process.env.SECRET_KEY as string, (err, user) => {
            if (err) return res.status(401).json({ message: 'Token is invalid' })
            else {
                req.user = user
                next()
            }
        })
    } catch (err) {
        return res.status(401).json(err)
    }
}
