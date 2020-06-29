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
exports.AlbumBusiness = void 0;
const InvalidData_1 = require("../errors/InvalidData");
class AlbumBusiness {
    constructor(albumdataBase, idGenerator, genreDataBase) {
        this.albumdataBase = albumdataBase;
        this.idGenerator = idGenerator;
        this.genreDataBase = genreDataBase;
    }
    createAlbum(name, artistId, genresList) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.idGenerator.generateId();
            let genresListID = [];
            for (let genre of genresList) {
                let genreData = yield this.genreDataBase.getGenreByName(genre.trim());
                if (!genreData) {
                    throw new InvalidData_1.InvalidData(`O gènero ${genre} não está cadastrado no sistema. 
                Cadastre todos os gêneros para poder criar um albúm`);
                }
                genresListID.push(genreData.id);
            }
            yield this.albumdataBase.createAlbum(id, name, artistId);
            for (let genreId of genresListID) {
                yield this.albumdataBase.createRelationAlbumAndGenre(id, genreId);
            }
            return 'Album criado com sucesso';
        });
    }
}
exports.AlbumBusiness = AlbumBusiness;
