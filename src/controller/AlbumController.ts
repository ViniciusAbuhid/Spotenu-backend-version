import { AlbumBusiness } from "../business/AlbumBusiness";
import { AlbumDataBase } from "../data/AlbumDataBase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { Request, Response } from 'express'
import { UserRoles } from "../models/User";
import { GenericError } from "../errors/GenericError";
import { BaseDataBase } from "../data/BaseDataBase";
import { InvalidData } from "../errors/InvalidData";
import { GenreDataBase } from "../data/GenreDataBase";

export class AlbumController {
    private static albumBusiness = new AlbumBusiness(new AlbumDataBase, new IdGenerator, new GenreDataBase)

    private static tokenGenerator = new TokenGenerator()

    public async createAlbum(req: Request, res: Response) {
        try {
            if (!req.body.name) {
                throw new InvalidData('Informações inválidas')
            }
            if (!req.body.genres) {
                throw new InvalidData('O seu album deve ter ao menos um gênero')
            }
            const genresList = req.body.genres.split(',')
            const verifyToken = AlbumController.tokenGenerator.
                verifyToken(req.headers.authorization as string) as any
            if (verifyToken.role !== UserRoles.BANDA) {
                throw new GenericError('Apenas bandas podem criar albuns')
            }
            const result = await AlbumController.albumBusiness.
                createAlbum(req.body.name, verifyToken.id, genresList)
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