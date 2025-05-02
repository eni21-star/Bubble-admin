
const env = process.env.NODE_ENV || 'development'

export type NODE_ENV = 'development' | 'staging' | 'production' | 'test'

export const getEnv = ()=>{
    return env as NODE_ENV
}