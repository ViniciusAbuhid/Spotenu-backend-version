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
exports.GenreController = void 0;
const GenreBusiness_1 = require("../business/GenreBusiness");
const IdGenerator_1 = require("../services/IdGenerator");
const GenreDataBase_1 = require("../data/GenreDataBase");
const TokenGenerator_1 = require("../services/TokenGenerator");
const User_1 = require("../models/User");
const GenericError_1 = require("../errors/GenericError");
const BaseDataBase_1 = require("../data/BaseDataBase");
let GenreController = /** @class */ (() => {
    class GenreController {
        addGenre(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const verifyToken = GenreController.tokenGenerator.
                        verifyToken(req.headers.authorization);
                    if (verifyToken.role === User_1.UserRoles.ADMIN) {
                        const result = yield GenreController.genreBusiness.addGenre(req.body.name);
                        res.status(200).send({
                            message: result
                        });
                    }
                    else {
                        throw new GenericError_1.GenericError('Criação de generos restrita a admins');
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
        getAllGenres(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const verifyToken = GenreController.tokenGenerator.
                        verifyToken(req.headers.authorization);
                    if (verifyToken.role !== User_1.UserRoles.ADMIN && verifyToken.role !== User_1.UserRoles.BANDA) {
                        throw new GenericError_1.GenericError('Apenas admins e bandas tem acesso a lista completa de gêneros');
                    }
                    const result = yield GenreController.genreBusiness.getAllGenres();
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
    GenreController.genreBusiness = new GenreBusiness_1.GenreBusiness(new IdGenerator_1.IdGenerator(), new GenreDataBase_1.GenreDataBase());
    GenreController.tokenGenerator = new TokenGenerator_1.TokenGenerator();
    return GenreController;
})();
exports.GenreController = GenreController;
