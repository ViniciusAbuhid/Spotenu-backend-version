import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { UserDataBase } from '../data/UserDataBase'
import { IdGenerator } from '../services/IdGenerator'
import { HashGenarator } from '../services/HashGenerator'
import { InvalidData } from '../errors/InvalidData'
import { TokenGenerator } from '../services/TokenGenerator'
import { BaseDataBase } from '../data/BaseDataBase'
import { UserRoles } from '../models/User'
import { GenericError } from '../errors/GenericError'

export class UserController {
    public static userBusiness = new UserBusiness(new UserDataBase, new IdGenerator, new HashGenarator, new TokenGenerator)

    public static tokenGenerator = new TokenGenerator()

    public async signUp(req: Request, res: Response) {
        const userInfo = {
            name: req.body.name,
            email: req.body.email,
            nickname: req.body.nickname,
            password: req.body.password,
            role: req.body.role,
            description: req.body.description
        }
        try {
            if (!userInfo.name || !userInfo.email || !userInfo.nickname || !userInfo.password
                || !userInfo.role) {
                throw new InvalidData('informações inválidas')
            }
            if (userInfo.password.length < 6) {
                throw new InvalidData('mínimo caracteres não respeitado para a senha')
            }
            if (userInfo.role === UserRoles.ADMIN) {
                console.log('to so no ifff')
                const verifyToken = UserController.tokenGenerator.
                    verifyToken(req.headers.authorization as string) as any
                if (verifyToken.role !== UserRoles.ADMIN) {
                    throw new GenericError('Só um admin pode adicionar outro admin')
                }
                if (userInfo.password.length < 10) {
                    throw new InvalidData('mínimo caracteres não respeitado para a senha')
                }
            }
            else if (userInfo.role !== UserRoles.OUVINTE_NAO_PAGANTE &&
                userInfo.role !== UserRoles.OUVINTE_PAGANTE && userInfo.role !== UserRoles.BANDA) {
                userInfo.role = UserRoles.OUVINTE_NAO_PAGANTE
            }
            const result = await UserController.userBusiness.signUp(userInfo.name, userInfo.email,
                userInfo.nickname, userInfo.password, userInfo.role, userInfo.description)
            res.status(200).send({ message: result })
        }
        catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message })
        }
        finally {
            BaseDataBase.destroy()
        }
    }

    public async getAllBands(req: Request, res: Response) {
        try {
            const verifyToken = UserController.tokenGenerator.
                verifyToken(req.headers.authorization as string) as any
            if (verifyToken.role === UserRoles.ADMIN) {
                console.log(verifyToken.role)
                const result = await UserController.userBusiness.getAllBands()
                res.status(200).send({
                    message: result
                })
            }
            else {
                throw new GenericError('apenas admins tem acesso a essas informações')
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

    public async approveBand(req: Request, res: Response) {
        try {
            const verifyToken = UserController.tokenGenerator.
                verifyToken(req.headers.authorization as string) as any
            if (verifyToken.role === UserRoles.ADMIN) {
                const result = await UserController.userBusiness.approveBand(req.params.id)
                res.status(200).send({
                    message: result
                })
            }
            else {
                throw new GenericError('apenas admins podem aprovar bandas')
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

    public async login(req: Request, res: Response) {
        const userInfo = {
            email: req.body.email,
            nickname: req.body.nickname,
            password: req.body.password
        }
        try {
            if (!userInfo.password || (!userInfo.email && !userInfo.nickname)) {
                throw new InvalidData('informações inválidas')
            }
            if (userInfo.password.length < 6) {
                throw new InvalidData('mínimo caracteres não respeitado para a senha')
            }
            const result = userInfo.email ?
                await UserController.userBusiness.login(userInfo.email, userInfo.nickname, userInfo.password) :
                await UserController.userBusiness.login(null, userInfo.nickname, userInfo.password)
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