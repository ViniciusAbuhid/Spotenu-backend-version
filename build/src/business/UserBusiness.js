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
exports.UserBusiness = void 0;
const User_1 = require("../models/User");
const GenericError_1 = require("../errors/GenericError");
const UserNotFound_1 = require("../errors/UserNotFound");
const InvalidData_1 = require("../errors/InvalidData");
class UserBusiness {
    constructor(userDataBase, idGenerator, hashGenerator, tokenGenerator) {
        this.userDataBase = userDataBase;
        this.idGenerator = idGenerator;
        this.hashGenerator = hashGenerator;
        this.tokenGenerator = tokenGenerator;
    }
    signUp(name, email, nickname, password, role, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.idGenerator.generateId();
            const hash = yield this.hashGenerator.generateHash(password);
            const result = yield this.userDataBase.signUp(id, name, email, nickname, hash, role, description);
            const accesToken = this.tokenGenerator.generateToken({ id, role });
            return role === User_1.UserRoles.BANDA ? 'banda cadastrada' : "O seu token de acesso é:" + accesToken;
        });
    }
    getAllBands() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userDataBase.getAllBands();
            return result;
        });
    }
    approveBand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyBandStatus = yield this.userDataBase.getBandById(id);
            if (verifyBandStatus.getRole() !== User_1.UserRoles.BANDA) {
                throw new GenericError_1.GenericError('O usuário não é uma banda');
            }
            if (verifyBandStatus.getApproval()) {
                throw new GenericError_1.GenericError('Banda já aprovada');
            }
            const result = yield this.userDataBase.approveBand(id);
            return 'Banda aprovada com sucesso';
        });
    }
    login(email, nickname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = email ? yield this.userDataBase.getUSerByNicknameOrEmail(email, null) :
                yield this.userDataBase.getUSerByNicknameOrEmail(null, nickname);
            if (!result) {
                throw new UserNotFound_1.UserNotFound('Informações inválidas');
            }
            const compareHash = yield this.hashGenerator.compare(password, result.password);
            if (!compareHash) {
                throw new InvalidData_1.InvalidData('informações inválidas');
            }
            const accesToken = this.tokenGenerator.generateToken({
                id: result.id,
                role: result.role
            });
            return "O seu token de acesso é:" + accesToken;
        });
    }
}
exports.UserBusiness = UserBusiness;
