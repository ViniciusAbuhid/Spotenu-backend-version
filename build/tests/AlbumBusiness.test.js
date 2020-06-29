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
const AlbumBusiness_1 = require("../src/business/AlbumBusiness");
describe('testing create album', () => {
    let albumDataBase = {};
    let idGenerator = {};
    let genreDataBase = {};
    test('it should return an error, due to a false genre', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const generateId = jest.fn(() => 'id');
            idGenerator = {
                generateId
            };
            const getGenreByName = jest.fn(() => undefined);
            genreDataBase = {
                getGenreByName
            };
            const albumBusiness = yield new AlbumBusiness_1.AlbumBusiness(albumDataBase, idGenerator, genreDataBase).createAlbum('name', 'artistId', ['genre1', 'genre2', 'genre3']);
        }
        catch (err) {
            expect(err.errorCode).toEqual(422);
        }
    }));
    test('it should return a success message', () => __awaiter(void 0, void 0, void 0, function* () {
        const generateId = jest.fn(() => 'id');
        idGenerator = {
            generateId
        };
        const getGenreByName = jest.fn(() => 'genre');
        genreDataBase = {
            getGenreByName
        };
        const createAlbum = jest.fn(() => 'ok');
        const createRelationAlbumAndGenre = jest.fn(() => 'ok');
        albumDataBase = {
            createAlbum,
            createRelationAlbumAndGenre
        };
        const result = yield new AlbumBusiness_1.AlbumBusiness(albumDataBase, idGenerator, genreDataBase).createAlbum('name', 'artistId', ['genre1', 'genre2', 'genre3']);
        expect(result).toBe('Album criado com sucesso');
        expect(getGenreByName).toHaveBeenCalledTimes(3);
    }));
});
