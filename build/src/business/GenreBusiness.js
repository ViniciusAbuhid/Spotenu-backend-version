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
exports.GenreBusiness = void 0;
class GenreBusiness {
    constructor(idGenerator, genreDataBase) {
        this.idGenerator = idGenerator;
        this.genreDataBase = genreDataBase;
    }
    addGenre(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this.idGenerator.generateId();
            yield this.genreDataBase.addGenre(name, id);
            return 'gênero adicionado com sucesso!';
        });
    }
    getAllGenres() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.genreDataBase.getAllGenres();
            return result;
        });
    }
}
exports.GenreBusiness = GenreBusiness;
