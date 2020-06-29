export class ErrorBase extends Error{
    constructor(message: string, public errorCode: number){
        super(message)
    }
}