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
exports.MusicDataBase = void 0;
const BaseDataBase_1 = require("./BaseDataBase");
const Musica_1 = require("../models/Musica");
class MusicDataBase extends BaseDataBase_1.BaseDataBase {
    constructor() {
        super(...arguments);
        this.tableName = 'Musics_Spotenu';
    }
    addMusic(id, name, album_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection().insert({ id, name, album_id }).into(this.tableName);
        });
    }
    getMusicsList(offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getConnection().select('*').from(this.tableName).limit(10).offset(offset);
            const filteredResult = result.map(music => {
                return new Musica_1.Music(music.name, music.id);
            });
            return filteredResult;
        });
    }
}
exports.MusicDataBase = MusicDataBase;
