import { BaseDataBase } from "./BaseDataBase";
import { UserRoles, User } from "../models/User";
import { UserNotFound } from "../errors/UserNotFound";

export class UserDataBase extends BaseDataBase {
    tableName = 'Users_Spotenu'

    public async signUp(id: string, name: string, email: string, nickname: string,
        password: string, role: string, description?: string) {
        let approved = role === UserRoles.BANDA ? 0 : 1
        const result = await this.getConnection().insert({
            id,
            name,
            email,
            nickname,
            password,
            role,
            description,
            approved
        }).into(this.tableName)
    }

    public async getAllBands() {
        const result = await this.getConnection().raw(`
        SELECT * FROM ${this.tableName}
        WHERE role = '${UserRoles.BANDA}'
        `)
        const filteredResult = result[0].map((band: any) => {
            return new User(band.name, band.email, band.nickname, band.approved === 0 ? false : true,
                band.description && band.description)
        })
        return filteredResult
    }

    public async getBandById(id: string) {
        const result = await this.getConnection().select('*').from(this.tableName).where({ id })
        if (result.length === 0) {
            throw new UserNotFound('Banda não encontrada')
        }
        return new User(result[0].name, result[0].email, result[0].nickname,
            result[0].approved === 0 ? false : true, result[0].description && result[0].description,
            result[0].role)
    }

    public async approveBand(id: string) {
        await this.getConnection().raw(`
        UPDATE ${this.tableName}
        SET approved = 1
        WHERE id = '${id}'
        `)
    }

    public async getUSerByNicknameOrEmail(email: string | null, nickname: string | null) {
        console.log('to chegando na quer')
        const result = email ? await this.getConnection().select('*').from(this.tableName).where({ email }) :
            await this.getConnection().select('*').from(this.tableName).where({ nickname })
        return result[0]
    }
}