import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User';

//añado el parametro user al objeto request
declare global {
    namespace Express {
        interface Request{
            user?: IUser
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization
    if (!bearer) {
        return res.status(401).json({ error: 'Sin permisos' })
    }

    const [, token] = bearer.split(' ')
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (typeof decoded === 'object' && decoded.id) {
            const user = await User.findById(decoded.id)
                .select('_id name email favorites')
                .lean<IUser>()
            if (!user) return res.status(401).json({ error: 'Token no válido' })
            req.user = user
            return next() //solo continúa si el usuario existe
        }

        return res.status(401).json({ error: 'Token no válido' })
    } catch (error) {
        return res.status(401).json({ error: 'Token no válido' })
    }
}
