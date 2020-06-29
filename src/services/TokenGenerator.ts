import * as jwt from 'jsonwebtoken'

export class TokenGenerator{
    static expiresIn = '2d'

    public generateToken(input: AuthenticationData):string{
        console.log(TokenGenerator.expiresIn, 'expiresIn')
        const token = jwt.sign(
            {
                id: input.id,
                role: input.role
            },
            process.env.JWT_KEY as string,
            {
                expiresIn: TokenGenerator.expiresIn
            })
        return token
    }

    public verifyToken(token:string){
        const result = jwt.verify(token, process.env.JWT_KEY as string)
      return result;
    }
}

export interface AuthenticationData {
    id: string,
    role: string
}