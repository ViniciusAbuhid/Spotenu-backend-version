import { GenreBusiness } from "../src/business/GenreBusiness"
import { GenreDataBase } from "../src/data/GenreDataBase"

describe('testing addGenre', ()=> {
    let idGenerator = {}
    let genreDataBase = {}
    test('it should return the success phrase', async ()=>{
        const generateId = jest.fn(()=> 'id')
        const addGenre = jest.fn(()=> 'genero adicionado com sucesso')
        idGenerator= {
            generateId
        }
        genreDataBase = {
            addGenre
        }
        const result = await new GenreBusiness(idGenerator as any, genreDataBase as any).addGenre('name')
        expect(result).toBe("gênero adicionado com sucesso!")
    })
})

describe('getAllgenres', ()=>{
    let idGenerator = {}
    let genreDataBase = {}
    test("it should retur the return of genreDataBase.getAllGenres()", async ()=>{
        const getAllGenres = jest.fn(()=> 'sucesso, Brasil!')
        genreDataBase = {
            getAllGenres
        }
        const result = await new GenreBusiness(idGenerator as any, genreDataBase as any).getAllGenres()
        expect(result).toStrictEqual('sucesso, Brasil!')
    })
})