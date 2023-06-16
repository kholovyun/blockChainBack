import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export const auth = (expressReq: Request, res: Response, next: NextFunction) => {
    const req = expressReq as any
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const data = jwt.verify(req.get('Authorization') || '', 'somekey' || '')
        if (data) {
            req.dataFromToken = data as any
            next()
        } else {
            const response = {
                data: undefined,
                message: 'Not authorized'
            }
            res.status(200).send(response)
        }
    } catch {
        const response = {
            data: undefined,
            message: 'Not authorized'
        }
        res.status(200).send(response)
    }
}
