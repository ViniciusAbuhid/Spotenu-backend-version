import { BaseDataBase } from "./BaseDataBase";
import { Genre } from "../models/Genre";

export class GenreDataBase extends BaseDataBase{
    tableName = 'Genres_Spotenu'

    public async addGenre(name:string, id:string){
        await this.getConnection().raw(`
        INSERT INTO ${this.tableName}
        (id, name)
        VALUES('${id}', '${name}')
        `)
    }

    public async getAllGenres(){
        const result = await this.getConnection().select('*').from(this.tableName)
        const filteredResult = result.map((genre: any) => {
            return new Genre(genre.name)
        })
        return filteredResult
    }

    public async getGenreByName(name: string){
        const result = await this.getConnection().select('*').from(this.tableName).where({name})
        return result[0]
    }
}