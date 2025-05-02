import bcrypt from 'bcrypt'



export const bcryptHash = async (password: string)=>{
   return await bcrypt.hash(password, 10)
}

export const bcryptCompare = async (password: string, hash: string)=>{
    return await bcrypt.compare(password, hash)
}