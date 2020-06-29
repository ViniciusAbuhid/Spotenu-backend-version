import { IdGenerator } from "../services/IdGenerator";
import { GenreDataBase } from '../data/GenreDataBase'

export class GenreBusiness{
    constructor(private idGenerator: IdGenerator, private genreDataBase: GenreDataBase){}

    public async addGenre(name: string){
        const id = this.idGenerator.generateId()
        await this.genreDataBase.addGenre(name, id)
        return 'gênero adicionado com sucesso!'
    }

    public async getAllGenres(){
        const result = await this.genreDataBase.getAllGenres()
        return result
    }
}