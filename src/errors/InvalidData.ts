import { ErrorBase } from "./ErrorBase";

export class InvalidData extends ErrorBase{
    constructor(message: string){
        super(message, 422)
    }
}