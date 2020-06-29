import { AlbumDataBase } from "../data/AlbumDataBase";
import { IdGenerator } from "../services/IdGenerator";
import { GenreDataBase } from "../data/GenreDataBase";
import { InvalidData } from "../errors/InvalidData";

export class AlbumBusiness {
    constructor(private albumdataBase: AlbumDataBase, private idGenerator: IdGenerator,
        private genreDataBase: GenreDataBase) { }

    public async createAlbum(name: string, artistId: string, genresList: Array<string>) {
        const id = this.idGenerator.generateId()
        let genresListID = []
        for (let genre of genresList) {
            let genreData = await this.genreDataBase.getGenreByName(genre.trim())
            if (!genreData) {
                throw new InvalidData(`O gènero ${genre} não está cadastrado no sistema. 
                Cadastre todos os gêneros para poder criar um albúm`)
            }
            genresListID.push(genreData.id)
        }
        await this.albumdataBase.createAlbum(id, name, artistId)
        for (let genreId of genresListID) {
            await this.albumdataBase.createRelationAlbumAndGenre(id, genreId)
        }
        return 'Album criado com sucesso'
    }
}