"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataBase = void 0;
const BaseDataBase_1 = require("./BaseDataBase");
const User_1 = require("../models/User");
const UserNotFound_1 = require("../errors/UserNotFound");
class UserDataBase extends BaseDataBase_1.BaseDataBase {
    constructor() {
        super(...arguments);
        this.tableName = 'Users_Spotenu';
    }
    signUp(id, name, email, nickname, password, role, description) {
        return __awaiter(this, void 0, void 0, function* () {
            let approved = role === User_1.UserRoles.BANDA ? 0 : 1;
            const result = yield this.getConnection().insert({
                id,
                name,
                email,
                nickname,
                password,
                role,
                description,
                approved
            }).into(this.tableName);
        });
    }
    getAllBands() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection().raw(`
        SELECT * FROM ${this.tableName}
        WHERE role = '${User_1.UserRoles.BANDA}'
        `);
            const filteredResult = result[0].map((band) => {
                return new User_1.User(band.name, band.email, band.nickname, band.approved === 0 ? false : true, band.description && band.description);
            });
            return filteredResult;
        });
    }
    getBandById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection().select('*').from(this.tableName).where({ id });
            if (result.length === 0) {
                throw new UserNotFound_1.UserNotFound('Banda não encontrada');
            }
            return new User_1.User(result[0].name, result[0].email, result[0].nickname, result[0].approved === 0 ? false : true, result[0].description && result[0].description, result[0].role);
        });
    }
    approveBand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection().raw(`
        UPDATE ${this.tableName}
        SET approved = 1
        WHERE id = '${id}'
        `);
        });
    }
    getUSerByNicknameOrEmail(email, nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('to chegando na quer');
            const result = email ? yield this.getConnection().select('*').from(this.tableName).where({ email }) :
                yield this.getConnection().select('*').from(this.tableName).where({ nickname });
            return result[0];
        });
    }
}
exports.UserDataBase = UserDataBase;
