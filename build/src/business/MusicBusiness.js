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
exports.MusicBusiness = void 0;
const InvalidData_1 = require("../errors/InvalidData");
class MusicBusiness {
    constructor(musicDataBase, idGenerator, albumDataBase) {
        this.musicDataBase = musicDataBase;
        this.idGenerator = idGenerator;
        this.albumDataBase = albumDataBase;
    }
    addMusic(name, album) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyAlbum = yield this.albumDataBase.getAlbumByName(album);
            if (!verifyAlbum[0]) {
                throw new InvalidData_1.InvalidData('Este album não existe');
            }
            const id = this.idGenerator.generateId();
            yield this.musicDataBase.addMusic(id, name, verifyAlbum[0].id);
            return 'musica criada com sucesso!';
        });
    }
    getMusicsList(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = 10 * (page - 1);
            const result = yield this.musicDataBase.getMusicsList(offset);
            return result;
        });
    }
}
exports.MusicBusiness = MusicBusiness;
