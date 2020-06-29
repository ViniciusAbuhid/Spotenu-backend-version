import { UserBusiness } from "../src/business/UserBusiness"
import { UserRoles } from "../src/models/User"
import { UserDataBase } from "../src/data/UserDataBase"

describe("testing signUp", () => {
    let userDataBase = {}
    let idGenerator = {}
    let hashGenerator = {}
    let tokenGenerator = {}
    test('it should return "banda cadastrada"', async () => {
        const generateId = jest.fn(() => 'id')
        const generateHash = jest.fn(() => 'id')
        const signUp = jest.fn(() => ('user'))
        const generateToken = jest.fn(() => ('token'))
        userDataBase = { signUp }
        idGenerator = { generateId }
        hashGenerator = { generateHash }
        tokenGenerator = { generateToken }
        const result = await new UserBusiness(userDataBase as any, idGenerator as any,
            hashGenerator as any, tokenGenerator as any).signUp('name', 'email', 'nickname', 'password',
                UserRoles.BANDA)
        expect(result).toBe('banda cadastrada')
        expect(generateHash).toHaveBeenCalledWith('password')
        expect(generateId).toHaveBeenCalled()
        expect(generateToken).toHaveBeenCalledWith({ id: 'id', role: 'BANDA' })
        expect(signUp).toHaveBeenCalled()
    })
    test('it should return "access token"', async () => {
        const generateId = jest.fn(() => 'id')
        const generateHash = jest.fn(() => 'id')
        const signUp = jest.fn(() => ('user'))
        const generateToken = jest.fn(() => ('token'))
        userDataBase = { signUp }
        idGenerator = { generateId }
        hashGenerator = { generateHash }
        tokenGenerator = { generateToken }
        const result = await new UserBusiness(userDataBase as any, idGenerator as any,
            hashGenerator as any, tokenGenerator as any).signUp('name', 'email', 'nickname', 'password',
                UserRoles.ADMIN)
        expect(result).toBe("O seu token de acesso é:" + 'token')
    })
})

describe('testing login', () => {
    let userDataBase = {}
    let idGenerator = {}
    let hashGenerator = {}
    let tokenGenerator = {}
    test('it should return a invalid email error', async () => {
        expect.assertions(1)
        try {
            const getUSerByNicknameOrEmail = jest.fn(() => false)
            userDataBase = {
                getUSerByNicknameOrEmail
            }
            await new UserBusiness(userDataBase as any, idGenerator as any,
                hashGenerator as any, tokenGenerator as any).login('email', 'nickname', 'senha')
        }
        catch (err) {
            expect(err.errorCode).toBe(404)
        }
    })
    test('it should return an error due to the invalid password', async () => {
        expect.assertions(1)
        try {
            const getUSerByNicknameOrEmail = jest.fn(() => true)
            userDataBase = {
                getUSerByNicknameOrEmail
            }
            const compare = jest.fn(() => false)
            hashGenerator = {
                compare
            }
            await new UserBusiness(userDataBase as any, idGenerator as any,
                hashGenerator as any, tokenGenerator as any).login('email', 'nickname', 'senha')
        }
        catch (err) {
            expect(err.message).toBe('informações inválidas')
        }
    })
    test('it should return a token', async () => {
        const getUSerByNicknameOrEmail = jest.fn(() => true)
        userDataBase = {
            getUSerByNicknameOrEmail
        }
        const compare = jest.fn(() => true)
        hashGenerator = {
            compare
        }
        const generateToken = jest.fn(() => 'token')
        tokenGenerator = {
            generateToken
        }
        const result = await new UserBusiness(userDataBase as any, idGenerator as any,
            hashGenerator as any, tokenGenerator as any).login(null, 'nickname', 'senha')
        expect(result).toBe("O seu token de acesso é:" + 'token')
        expect(getUSerByNicknameOrEmail).toHaveBeenCalledWith(null, 'nickname')
        expect(compare).toHaveBeenCalledWith('senha', undefined)
        expect(generateToken).toHaveBeenCalledWith({
            id: undefined,
            role: undefined
        })
    })
})

describe('testing approve Bands', () => {
    let userDataBase = {}
    let idGenerator = {}
    let hashGenerator = {}
    let tokenGenerator = {}
    test('it should return an error if the user is not a band', async () => {
        expect.assertions(1)
        try {
            const getBandById = jest.fn(() => ({
                getRole: () => 'not a band'
            }))
            userDataBase = {
                getBandById
            }
            await new UserBusiness(userDataBase as any, idGenerator as any,
                hashGenerator as any, tokenGenerator as any).approveBand('id')
        }
        catch (err) {
            expect(err.message).toBe('O usuário não é uma banda')
        }
    })
    test('it should return an error if the user is already approved', async () => {
        expect.assertions(1)
        try {
            const getBandById = jest.fn(() => ({
                getRole: () => 'BANDA',
                getApproval: () => true
            }))
            userDataBase = {
                getBandById
            }
            await new UserBusiness(userDataBase as any, idGenerator as any,
                hashGenerator as any, tokenGenerator as any).approveBand('id')
        }
        catch (err) {
            expect(err.message).toBe('Banda já aprovada')
        }
    })
    test('it should return the success message', async () => {
        const approveBand = jest.fn(() => { })
        const getBandById = jest.fn(() => ({
            getRole: () => 'BANDA',
            getApproval: () => false
        }))
        userDataBase = {
            getBandById,
            approveBand
        }
        const result = await new UserBusiness(userDataBase as any, idGenerator as any,
            hashGenerator as any, tokenGenerator as any).approveBand('id')
        expect(result).toBe('Banda aprovada com sucesso')
    })
})