import { AlbumBusiness } from "../src/business/AlbumBusiness"

describe('testing create album', () => {
    let albumDataBase = {}
    let idGenerator = {}
    let genreDataBase = {}
    test('it should return an error, due to a false genre', async () => {
        try {
            const generateId = jest.fn(() => 'id')
            idGenerator = {
                generateId
            }
            const getGenreByName = jest.fn(() => undefined)
            genreDataBase = {
                getGenreByName
            }
            const albumBusiness = await new AlbumBusiness(albumDataBase as any,
                idGenerator as any, genreDataBase as any).createAlbum('name', 'artistId',
                    ['genre1', 'genre2', 'genre3'])
        }
        catch (err) {
            expect(err.errorCode).toEqual(422)
        }
    })
    test('it should return a success message', async () => {
        const generateId = jest.fn(() => 'id')
        idGenerator = {
            generateId
        }
        const getGenreByName = jest.fn(() => 'genre')
        genreDataBase = {
            getGenreByName
        }
        const createAlbum = jest.fn(() => 'ok')
        const createRelationAlbumAndGenre = jest.fn(() => 'ok')
        albumDataBase = {
            createAlbum,
            createRelationAlbumAndGenre
        }
        const result = await new AlbumBusiness(albumDataBase as any,
            idGenerator as any, genreDataBase as any).createAlbum('name', 'artistId',
                ['genre1', 'genre2', 'genre3'])
        expect(result).toBe('Album criado com sucesso')
        expect(getGenreByName).toHaveBeenCalledTimes(3)
    })
})