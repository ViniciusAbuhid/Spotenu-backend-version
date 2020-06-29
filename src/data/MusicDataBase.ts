import { BaseDataBase } from "./BaseDataBase";
import { Music } from "../models/Musica";

export class MusicDataBase extends BaseDataBase{
    tableName = 'Musics_Spotenu'

    public async addMusic(id: string, name: string, album_id: string){
        await this.getConnection().insert({id, name, album_id}).into(this.tableName)
    }

    public async getMusicsList(offset: number){
        const result = await this.getConnection().select('*').from(this.tableName).limit(10).offset(offset)
        const filteredResult = result.map(music => {
            return new Music(music.name, music.id)
        })
        return filteredResult
    }
}