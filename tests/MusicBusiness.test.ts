import { MusicBusiness } from "../src/business/MusicBusiness"

describe('testing addMusic', () => {
    let musicDataBAse = {}
    let idGeneratore = {}
    let albumDataBase = {}
    test('it should return an error, with a undefined Album', async () => {
        expect.assertions(1)
        try{
        const getAlbumByName = jest.fn(()=> [undefined])
        albumDataBase = {
            getAlbumByName
        }
        const result = await new MusicBusiness(musicDataBAse as any, idGeneratore as any,
        albumDataBase as any).addMusic('nome da musica', 'nome do album')
        }
        catch (err) {
            expect(err.message).toBe('Este album não existe')
        }
    })
    test('after adding the music in the db, it should return a message success', async ()=>{
        const getAlbumByName = jest.fn(()=> ['album'])
        albumDataBase = {
            getAlbumByName
        }
        const generateId = jest.fn(()=> 'id')
        idGeneratore = {
            generateId
        }
        const addMusic = jest.fn(()=>'')
        musicDataBAse = {
            addMusic
        }
        const result = await new MusicBusiness(musicDataBAse as any, idGeneratore as any,
            albumDataBase as any).addMusic('nome da musica', 'nome do album')
        expect(generateId).toHaveBeenCalled()
        expect(result).toBe('musica criada com sucesso!')
        expect(getAlbumByName).toHaveBeenCalledWith('nome do album')
    })
})

describe('testind getMusicList', ()=> {
    let musicDataBase = {}
    let idGeneratore = {}
    let albumDataBase = {}
    test('it should return the return of musicDataBase.getMusicsList(offset)', async ()=>{
        const getMusicsList = jest.fn(()=> 'ola')
        musicDataBase = {
            getMusicsList
        }
        const result = await new MusicBusiness(musicDataBase as any, idGeneratore as any,
            albumDataBase as any).getMusicsList(5)
        expect(result).toBe('ola')
    })
})