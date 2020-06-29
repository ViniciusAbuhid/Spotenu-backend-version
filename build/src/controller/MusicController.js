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
exports.MusicController = void 0;
const MusicBusiness_1 = require("../business/MusicBusiness");
const MusicDataBase_1 = require("../data/MusicDataBase");
const IdGenerator_1 = require("../services/IdGenerator");
const AlbumDataBase_1 = require("../data/AlbumDataBase");
const BaseDataBase_1 = require("../data/BaseDataBase");
let MusicController = /** @class */ (() => {
    class MusicController {
        addMusic(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield MusicController.musicBusiness.addMusic(req.body.name, req.body.album.trim());
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
        getMusicList(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield MusicController.musicBusiness.getMusicsList(Number(req.params.page));
                    res.status(200).send({
                        message: result
                    });
                }
                catch (err) {
                    res.send(err.errorCode || 400).send({
                        message: err.message
                    });
                }
                finally {
                    BaseDataBase_1.BaseDataBase.destroy();
                }
            });
        }
    }
    MusicController.musicBusiness = new MusicBusiness_1.MusicBusiness(new MusicDataBase_1.MusicDataBase, new IdGenerator_1.IdGenerator, new AlbumDataBase_1.AlbumDataBase);
    return MusicController;
})();
exports.MusicController = MusicController;
