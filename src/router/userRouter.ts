import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

userRouter.post('/signup', new UserController().signUp)
userRouter.post('/login', new UserController().login)
userRouter.get('/allbands', new UserController().getAllBands)
userRouter.put('/approve/:id', new UserController().approveBand)