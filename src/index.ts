import express from 'express'
import dotenv from "dotenv";
import { AddressInfo } from "net";
import {userRouter} from './router/userRouter'
import { genreRouter } from './router/genreRouter';
import { albumRouter } from './router/albumRouter';
import { musicRouter } from './router/musicRouter'

const app = express()
dotenv.config();
app.use(express.json());

app.use('/user', userRouter)
app.use('/genre', genreRouter)
app.use('/albums', albumRouter)
app.use('/musics', musicRouter)

const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});
