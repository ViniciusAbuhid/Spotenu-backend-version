import bcryptjs from 'bcryptjs'


export class HashGenarator{
    public async generateHash(key:string){
        const salt = await bcryptjs.genSalt(Number(process.env.ROUNDS))
        const hash = await bcryptjs.hash(key, salt)
        return hash
    }

    public compare(key: string, hash: string){
        const result = bcryptjs.compare(key, hash)
        return result
    }
}