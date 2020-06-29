import { IdGenerator } from "../services/IdGenerator";
import { MusicDataBase } from '../data/MusicDataBase'
import { AlbumDataBase } from "../data/AlbumDataBase";
import { InvalidData } from "../errors/InvalidData";

export class MusicBusiness{
    constructor(private musicDataBase: MusicDataBase, private idGenerator: IdGenerator,
        private albumDataBase: AlbumDataBase){}

    public async addMusic(name: string, album: string){
        const verifyAlbum = await this.albumDataBase.getAlbumByName(album)
        if(!verifyAlbum[0]){
            throw new InvalidData('Este album não existe')
        }
        const id = this.idGenerator.generateId()
        await this.musicDataBase.addMusic(id, name, verifyAlbum[0].id)
        return 'musica criada com sucesso!'
    }

    public async getMusicsList(page:number){
        const offset = 10 * (page-1)
        const result = await this.musicDataBase.getMusicsList(offset)
        return result
    }
}