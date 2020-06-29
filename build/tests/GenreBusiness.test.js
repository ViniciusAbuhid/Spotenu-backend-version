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
const GenreBusiness_1 = require("../src/business/GenreBusiness");
describe('testing addGenre', () => {
    let idGenerator = {};
    let genreDataBase = {};
    test('it should return the success phrase', () => __awaiter(void 0, void 0, void 0, function* () {
        const generateId = jest.fn(() => 'id');
        const addGenre = jest.fn(() => 'genero adicionado com sucesso');
        idGenerator = {
            generateId
        };
        genreDataBase = {
            addGenre
        };
        const result = yield new GenreBusiness_1.GenreBusiness(idGenerator, genreDataBase).addGenre('name');
        expect(result).toBe("gênero adicionado com sucesso!");
    }));
});
describe('getAllgenres', () => {
    let idGenerator = {};
    let genreDataBase = {};
    test("it should retur the return of genreDataBase.getAllGenres()", () => __awaiter(void 0, void 0, void 0, function* () {
        const getAllGenres = jest.fn(() => 'sucesso, Brasil!');
        genreDataBase = {
            getAllGenres
        };
        const result = yield new GenreBusiness_1.GenreBusiness(idGenerator, genreDataBase).getAllGenres();
        expect(result).toStrictEqual('sucesso, Brasil!');
    }));
});
