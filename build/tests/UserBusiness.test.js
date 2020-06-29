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
const UserBusiness_1 = require("../src/business/UserBusiness");
const User_1 = require("../src/models/User");
describe("testing signUp", () => {
    let userDataBase = {};
    let idGenerator = {};
    let hashGenerator = {};
    let tokenGenerator = {};
    test('it should return "banda cadastrada"', () => __awaiter(void 0, void 0, void 0, function* () {
        const generateId = jest.fn(() => 'id');
        const generateHash = jest.fn(() => 'id');
        const signUp = jest.fn(() => ('user'));
        const generateToken = jest.fn(() => ('token'));
        userDataBase = { signUp };
        idGenerator = { generateId };
        hashGenerator = { generateHash };
        tokenGenerator = { generateToken };
        const result = yield new UserBusiness_1.UserBusiness(userDataBase, idGenerator, hashGenerator, tokenGenerator).signUp('name', 'email', 'nickname', 'password', User_1.UserRoles.BANDA);
        expect(result).toBe('banda cadastrada');
        expect(generateHash).toHaveBeenCalledWith('password');
        expect(generateId).toHaveBeenCalled();
        expect(generateToken).toHaveBeenCalledWith({ id: 'id', role: 'BANDA' });
        expect(signUp).toHaveBeenCalled();
    }));
    test('it should return "access token"', () => __awaiter(void 0, void 0, void 0, function* () {
        const generateId = jest.fn(() => 'id');
        const generateHash = jest.fn(() => 'id');
        const signUp = jest.fn(() => ('user'));
        const generateToken = jest.fn(() => ('token'));
        userDataBase = { signUp };
        idGenerator = { generateId };
        hashGenerator = { generateHash };
        tokenGenerator = { generateToken };
        const result = yield new UserBusiness_1.UserBusiness(userDataBase, idGenerator, hashGenerator, tokenGenerator).signUp('name', 'email', 'nickname', 'password', User_1.UserRoles.ADMIN);
        expect(result).toBe("O seu token de acesso é:" + 'token');
    }));
});
describe('testing login', () => {
    let userDataBase = {};
    let idGenerator = {};
    let hashGenerator = {};
    let tokenGenerator = {};
    test('it should return a invalid email error', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const getUSerByNicknameOrEmail = jest.fn(() => false);
            userDataBase = {
                getUSerByNicknameOrEmail
            };
            yield new UserBusiness_1.UserBusiness(userDataBase, idGenerator, hashGenerator, tokenGenerator).login('email', 'nickname', 'senha');
        }
        catch (err) {
            expect(err.errorCode).toBe(404);
        }
    }));
    test('it should return an error due to the invalid password', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const getUSerByNicknameOrEmail = jest.fn(() => true);
            userDataBase = {
                getUSerByNicknameOrEmail
            };
            const compare = jest.fn(() => false);
            hashGenerator = {
                compare
            };
            yield new UserBusiness_1.UserBusiness(userDataBase, idGenerator, hashGenerator, tokenGenerator).login('email', 'nickname', 'senha');
        }
        catch (err) {
            expect(err.message).toBe('informações inválidas');
        }
    }));
    test('it should return a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const getUSerByNicknameOrEmail = jest.fn(() => true);
        userDataBase = {
            getUSerByNicknameOrEmail
        };
        const compare = jest.fn(() => true);
        hashGenerator = {
            compare
        };
        const generateToken = jest.fn(() => 'token');
        tokenGenerator = {
            generateToken
        };
        const result = yield new UserBusiness_1.UserBusiness(userDataBase, idGenerator, hashGenerator, tokenGenerator).login(null, 'nickname', 'senha');
        expect(result).toBe("O seu token de acesso é:" + 'token');
        expect(getUSerByNicknameOrEmail).toHaveBeenCalledWith(null, 'nickname');
        expect(compare).toHaveBeenCalledWith('senha', undefined);
        expect(generateToken).toHaveBeenCalledWith({
            id: undefined,
            role: undefined
        });
    }));
});
describe('testing approve Bands', () => {
    let userDataBase = {};
    let idGenerator = {};
    let hashGenerator = {};
    let tokenGenerator = {};
    test('it should return an error if the user is not a band', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const getBandById = jest.fn(() => ({
                getRole: () => 'not a band'
            }));
            userDataBase = {
                getBandById
            };
            yield new UserBusiness_1.UserBusiness(userDataBase, idGenerator, hashGenerator, tokenGenerator).approveBand('id');
        }
        catch (err) {
            expect(err.message).toBe('O usuário não é uma banda');
        }
    }));
    test('it should return an error if the user is already approved', () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            const getBandById = jest.fn(() => ({
                getRole: () => 'BANDA',
                getApproval: () => true
            }));
            userDataBase = {
                getBandById
            };
            yield new UserBusiness_1.UserBusiness(userDataBase, idGenerator, hashGenerator, tokenGenerator).approveBand('id');
        }
        catch (err) {
            expect(err.message).toBe('Banda já aprovada');
        }
    }));
    test('it should return the success message', () => __awaiter(void 0, void 0, void 0, function* () {
        const approveBand = jest.fn(() => { });
        const getBandById = jest.fn(() => ({
            getRole: () => 'BANDA',
            getApproval: () => false
        }));
        userDataBase = {
            getBandById,
            approveBand
        };
        const result = yield new UserBusiness_1.UserBusiness(userDataBase, idGenerator, hashGenerator, tokenGenerator).approveBand('id');
        expect(result).toBe('Banda aprovada com sucesso');
    }));
});
