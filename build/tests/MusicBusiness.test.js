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
const MusicBusiness_1 = require("../src/business/MusicBusiness");
describe('testing addMusic', () => {
    let musicDataBAse = {};
    let idGeneratore = {};
    let albumDataBase = {};
    test('it should return an error, with a undefined Album', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const getAlbumByName = jest.fn(() => [undefined]);
            albumDataBase = {
                getAlbumByName
            };
            const result = yield new MusicBusiness_1.MusicBusiness(musicDataBAse, idGeneratore, albumDataBase).addMusic('nome da musica', 'nome do album');
        }
        catch (err) {
            expect(err.message).toBe('Este album não existe');
        }
    }));
    test('after adding the music in the db, it should return a message success', () => __awaiter(void 0, void 0, void 0, function* () {
        const getAlbumByName = jest.fn(() => ['album']);
        albumDataBase = {
            getAlbumByName
        };
        const generateId = jest.fn(() => 'id');
        idGeneratore = {
            generateId
        };
        const addMusic = jest.fn(() => '');
        musicDataBAse = {
            addMusic
        };
        const result = yield new MusicBusiness_1.MusicBusiness(musicDataBAse, idGeneratore, albumDataBase).addMusic('nome da musica', 'nome do album');
        expect(generateId).toHaveBeenCalled();
        expect(result).toBe('musica criada com sucesso!');
        expect(getAlbumByName).toHaveBeenCalledWith('nome do album');
    }));
});
describe('testind getMusicList', () => {
    let musicDataBase = {};
    let idGeneratore = {};
    let albumDataBase = {};
    test('it should return the return of musicDataBase.getMusicsList(offset)', () => __awaiter(void 0, void 0, void 0, function* () {
        const getMusicsList = jest.fn(() => 'ola');
        musicDataBase = {
            getMusicsList
        };
        const result = yield new MusicBusiness_1.MusicBusiness(musicDataBase, idGeneratore, albumDataBase).getMusicsList(5);
        expect(result).toBe('ola');
    }));
});
