import jwt from 'jsonwebtoken'

export const generateJWT = (payload: {[key: string]: string | number | boolean}, lifeTime: string | number) => {
    return jwt.sign(payload, 'somekey' || '', {expiresIn: lifeTime})
}
