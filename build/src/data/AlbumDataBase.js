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
exports.AlbumDataBase = void 0;
const BaseDataBase_1 = require("./BaseDataBase");
class AlbumDataBase extends BaseDataBase_1.BaseDataBase {
    constructor() {
        super(...arguments);
        this.tableName = 'Albums_Spotenu';
    }
    createAlbum(id, name, artistId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection().raw(`
        INSERT INTO ${this.tableName}
        (id, name, artist_id)
        VALUES('${id}', '${name}', '${artistId}' )
        `);
        });
    }
    createRelationAlbumAndGenre(id_album, id_genre) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection().insert({ id_album, id_genre }).into('Albumns_Genres_Spotenu');
        });
    }
    getAlbumByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection().select('*').from(this.tableName).where({ name });
            return result;
        });
    }
}
exports.AlbumDataBase = AlbumDataBase;
