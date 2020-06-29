import { BaseDataBase } from "./BaseDataBase";

export class AlbumDataBase extends BaseDataBase {
    tableName = 'Albums_Spotenu'

    public async createAlbum(id: string, name: string, artistId: string) {
        await this.getConnection().raw(`
        INSERT INTO ${this.tableName}
        (id, name, artist_id)
        VALUES('${id}', '${name}', '${artistId}' )
        `)
    }

    public async createRelationAlbumAndGenre(id_album: string, id_genre: string){
        await this.getConnection().insert({id_album, id_genre}).into('Albumns_Genres_Spotenu')
    }

    public async getAlbumByName(name:string){
        const result = await this.getConnection().select('*').from(this.tableName).where({name})
        return result
    }
}