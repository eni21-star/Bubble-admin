import jwt from 'jsonwebtoken'
import appConfig from '../../config/app.config'


export const signAccessToken = (data: { id: string, permissions: Array<string>})=>{

    return jwt.sign(data, appConfig.services.jwtSecret, {expiresIn: '24hr'})

}

export const signRefreshToken = (data: { id: string})=>{

    return jwt.sign(data, appConfig.services.jwtSecret, {expiresIn: '7d'})

}