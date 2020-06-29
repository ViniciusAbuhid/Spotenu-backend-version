import { GenreBusiness } from "../business/GenreBusiness";
import { IdGenerator } from "../services/IdGenerator";
import { GenreDataBase } from "../data/GenreDataBase";
import { Request, Response } from 'express'
import { TokenGenerator } from "../services/TokenGenerator";
import { UserRoles } from "../models/User";
import { GenericError } from "../errors/GenericError";
import { BaseDataBase } from "../data/BaseDataBase";

export class GenreController {
    private static genreBusiness = new GenreBusiness(new IdGenerator(), new GenreDataBase())

    public static tokenGenerator = new TokenGenerator()

    public async addGenre(req: Request, res: Response) {
        try {
            const verifyToken = GenreController.tokenGenerator.
                verifyToken(req.headers.authorization as string) as any
            if (verifyToken.role === UserRoles.ADMIN) {
                const result = await GenreController.genreBusiness.addGenre(req.body.name)
                res.status(200).send({
                    message: result
                })
            }
            else {
                throw new GenericError('Criação de generos restrita a admins')

            }
        }
        catch (err) {
            res.status(err.errorCode || 400).send({
                message: err.message
            })
        }
        finally {
            BaseDataBase.destroy()
        }
    }

    public async getAllGenres(req: Request, res: Response){
        try {
            const verifyToken = GenreController.tokenGenerator.
            verifyToken(req.headers.authorization as string) as any
            if(verifyToken.role !== UserRoles.ADMIN && verifyToken.role !== UserRoles.BANDA){
                throw new GenericError('Apenas admins e bandas tem acesso a lista completa de gêneros')
            }
            const result = await GenreController.genreBusiness.getAllGenres()
            res.status(200).send({
                message: result
            })
        }
        catch (err) {
            res.status(err.errorCode || 400).send({
                message: err.message
            })
        }
        finally {
            BaseDataBase.destroy()
        }
    }
}