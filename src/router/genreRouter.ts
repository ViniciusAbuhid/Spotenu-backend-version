import {GenreController} from '../controller/GenreController'
import express from 'express'

export const genreRouter = express.Router();

genreRouter.post('/add', new GenreController().addGenre)
genreRouter.get('/seeAll', new GenreController().getAllGenres)