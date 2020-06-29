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
exports.UserController = void 0;
const UserBusiness_1 = require("../business/UserBusiness");
const UserDataBase_1 = require("../data/UserDataBase");
const IdGenerator_1 = require("../services/IdGenerator");
const HashGenerator_1 = require("../services/HashGenerator");
const InvalidData_1 = require("../errors/InvalidData");
const TokenGenerator_1 = require("../services/TokenGenerator");
const BaseDataBase_1 = require("../data/BaseDataBase");
const User_1 = require("../models/User");
const GenericError_1 = require("../errors/GenericError");
let UserController = /** @class */ (() => {
    class UserController {
        signUp(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const userInfo = {
                    name: req.body.name,
                    email: req.body.email,
                    nickname: req.body.nickname,
                    password: req.body.password,
                    role: req.body.role,
                    description: req.body.description
                };
                try {
                    if (!userInfo.name || !userInfo.email || !userInfo.nickname || !userInfo.password
                        || !userInfo.role) {
                        throw new InvalidData_1.InvalidData('informações inválidas');
                    }
                    if (userInfo.password.length < 6) {
                        throw new InvalidData_1.InvalidData('mínimo caracteres não respeitado para a senha');
                    }
                    if (userInfo.role === User_1.UserRoles.ADMIN) {
                        console.log('to so no ifff');
                        const verifyToken = UserController.tokenGenerator.
                            verifyToken(req.headers.authorization);
                        if (verifyToken.role !== User_1.UserRoles.ADMIN) {
                            throw new GenericError_1.GenericError('Só um admin pode adicionar outro admin');
                        }
                        if (userInfo.password.length < 10) {
                            throw new InvalidData_1.InvalidData('mínimo caracteres não respeitado para a senha');
                        }
                    }
                    else if (userInfo.role !== User_1.UserRoles.OUVINTE_NAO_PAGANTE &&
                        userInfo.role !== User_1.UserRoles.OUVINTE_PAGANTE && userInfo.role !== User_1.UserRoles.BANDA) {
                        userInfo.role = User_1.UserRoles.OUVINTE_NAO_PAGANTE;
                    }
                    const result = yield UserController.userBusiness.signUp(userInfo.name, userInfo.email, userInfo.nickname, userInfo.password, userInfo.role, userInfo.description);
                    res.status(200).send({ message: result });
                }
                catch (err) {
                    res.status(err.errorCode || 400).send({ message: err.message });
                }
                finally {
                    BaseDataBase_1.BaseDataBase.destroy();
                }
            });
        }
        getAllBands(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const verifyToken = UserController.tokenGenerator.
                        verifyToken(req.headers.authorization);
                    if (verifyToken.role === User_1.UserRoles.ADMIN) {
                        console.log(verifyToken.role);
                        const result = yield UserController.userBusiness.getAllBands();
                        res.status(200).send({
                            message: result
                        });
                    }
                    else {
                        throw new GenericError_1.GenericError('apenas admins tem acesso a essas informações');
                    }
                }
                catch (err) {
                    res.status(err.errorCode || 400).send({
                        message: err.message
                    });
                }
                finally {
                    BaseDataBase_1.BaseDataBase.destroy();
                }
            });
        }
        approveBand(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const verifyToken = UserController.tokenGenerator.
                        verifyToken(req.headers.authorization);
                    if (verifyToken.role === User_1.UserRoles.ADMIN) {
                        const result = yield UserController.userBusiness.approveBand(req.params.id);
                        res.status(200).send({
                            message: result
                        });
                    }
                    else {
                        throw new GenericError_1.GenericError('apenas admins podem aprovar bandas');
                    }
                }
                catch (err) {
                    res.status(err.errorCode || 400).send({
                        message: err.message
                    });
                }
                finally {
                    BaseDataBase_1.BaseDataBase.destroy();
                }
            });
        }
        login(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const userInfo = {
                    email: req.body.email,
                    nickname: req.body.nickname,
                    password: req.body.password
                };
                try {
                    if (!userInfo.password || (!userInfo.email && !userInfo.nickname)) {
                        throw new InvalidData_1.InvalidData('informações inválidas');
                    }
                    if (userInfo.password.length < 6) {
                        throw new InvalidData_1.InvalidData('mínimo caracteres não respeitado para a senha');
                    }
                    const result = userInfo.email ?
                        yield UserController.userBusiness.login(userInfo.email, userInfo.nickname, userInfo.password) :
                        yield UserController.userBusiness.login(null, userInfo.nickname, userInfo.password);
                    res.status(200).send({
                        message: result
                    });
                }
                catch (err) {
                    res.status(err.errorCode || 400).send({
                        message: err.message
                    });
                }
                finally {
                    BaseDataBase_1.BaseDataBase.destroy();
                }
            });
        }
    }
    UserController.userBusiness = new UserBusiness_1.UserBusiness(new UserDataBase_1.UserDataBase, new IdGenerator_1.IdGenerator, new HashGenerator_1.HashGenarator, new TokenGenerator_1.TokenGenerator);
    UserController.tokenGenerator = new TokenGenerator_1.TokenGenerator();
    return UserController;
})();
exports.UserController = UserController;
