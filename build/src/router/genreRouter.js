"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreRouter = void 0;
const GenreController_1 = require("../controller/GenreController");
const express_1 = __importDefault(require("express"));
exports.genreRouter = express_1.default.Router();
exports.genreRouter.post('/add', new GenreController_1.GenreController().addGenre);
exports.genreRouter.get('/seeAll', new GenreController_1.GenreController().getAllGenres);
