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
exports.AlbumController = void 0;
const AlbumBusiness_1 = require("../business/AlbumBusiness");
const AlbumDataBase_1 = require("../data/AlbumDataBase");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenGenerator_1 = require("../services/TokenGenerator");
const User_1 = require("../models/User");
const GenericError_1 = require("../errors/GenericError");
const BaseDataBase_1 = require("../data/BaseDataBase");
const InvalidData_1 = require("../errors/InvalidData");
const GenreDataBase_1 = require("../data/GenreDataBase");
let AlbumController = /** @class */ (() => {
    class AlbumController {
        createAlbum(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!req.body.name) {
                        throw new InvalidData_1.InvalidData('Informações inválidas');
                    }
                    if (!req.body.genres) {
                        throw new InvalidData_1.InvalidData('O seu album deve ter ao menos um gênero');
                    }
                    const genresList = req.body.genres.split(',');
                    const verifyToken = AlbumController.tokenGenerator.
                        verifyToken(req.headers.authorization);
                    if (verifyToken.role !== User_1.UserRoles.BANDA) {
                        throw new GenericError_1.GenericError('Apenas bandas podem criar albuns');
                    }
                    const result = yield AlbumController.albumBusiness.
                        createAlbum(req.body.name, verifyToken.id, genresList);
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
    AlbumController.albumBusiness = new AlbumBusiness_1.AlbumBusiness(new AlbumDataBase_1.AlbumDataBase, new IdGenerator_1.IdGenerator, new GenreDataBase_1.GenreDataBase);
    AlbumController.tokenGenerator = new TokenGenerator_1.TokenGenerator();
    return AlbumController;
})();
exports.AlbumController = AlbumController;
