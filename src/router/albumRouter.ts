import express from 'express'
import { AlbumController } from '../controller/AlbumController'

export const albumRouter = express.Router()

albumRouter.put('/create', new AlbumController().createAlbum)