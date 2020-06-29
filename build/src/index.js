"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = require("./router/userRouter");
const genreRouter_1 = require("./router/genreRouter");
const albumRouter_1 = require("./router/albumRouter");
const musicRouter_1 = require("./router/musicRouter");
exports.app = express_1.default();
dotenv_1.default.config();
exports.app.use(express_1.default.json());
exports.app.use('/user', userRouter_1.userRouter);
exports.app.use('/genre', genreRouter_1.genreRouter);
exports.app.use('/albums', albumRouter_1.albumRouter);
exports.app.use('/musics', musicRouter_1.musicRouter);
const server = exports.app.listen(3000, () => {
    if (server) {
        const address = server.address();
        console.log(`Servidor rodando em http://localhost:${address.port}`);
    }
    else {
        console.error(`Falha ao rodar o servidor.`);
    }
});
