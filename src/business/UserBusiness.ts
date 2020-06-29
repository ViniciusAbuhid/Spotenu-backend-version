import { UserDataBase } from "../data/UserDataBase";
import { IdGenerator } from '../services/IdGenerator'
import { HashGenarator } from "../services/HashGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { UserRoles } from "../models/User";
import { GenericError } from "../errors/GenericError";
import { UserNotFound } from "../errors/UserNotFound";
import { InvalidData } from "../errors/InvalidData";

export class UserBusiness {
    constructor(
        private userDataBase: UserDataBase,
        private idGenerator: IdGenerator,
        private hashGenerator: HashGenarator,
        private tokenGenerator: TokenGenerator
    ) { }

    public async signUp(name: string, email: string, nickname: string,
        password: string, role: string, description?: string) {
        const id = this.idGenerator.generateId()
        const hash = await this.hashGenerator.generateHash(password)
        const result = await this.userDataBase.signUp(id, name, email, nickname, hash, role, description)
        const accesToken = this.tokenGenerator.generateToken({ id, role })
        return role === UserRoles.BANDA ? 'banda cadastrada' : "O seu token de acesso é:" + accesToken
    }

    public async getAllBands() {
        const result = await this.userDataBase.getAllBands()
        return result
    }

    public async approveBand(id: string) {
        const verifyBandStatus = await this.userDataBase.getBandById(id)
        if (verifyBandStatus.getRole() !== UserRoles.BANDA) {
            throw new GenericError('O usuário não é uma banda')
        }
        if (verifyBandStatus.getApproval()) {
            throw new GenericError('Banda já aprovada')
        }
        const result = await this.userDataBase.approveBand(id)
        return 'Banda aprovada com sucesso'
    }

    public async login(email: string | null, nickname: string | null, password: string) {
        const result = email ? await this.userDataBase.getUSerByNicknameOrEmail(email, null) :
            await this.userDataBase.getUSerByNicknameOrEmail(null, nickname)
        if (!result) {
            throw new UserNotFound('Informações inválidas')
        }
        const compareHash = await this.hashGenerator.compare(password, result.password)
        if (!compareHash) {
            throw new InvalidData('informações inválidas')
        }
        const accesToken = this.tokenGenerator.generateToken({
            id: result.id,
            role: result.role
        })
        return "O seu token de acesso é:" + accesToken
    }
}
