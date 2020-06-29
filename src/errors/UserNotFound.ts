import { ErrorBase } from "./ErrorBase";

export class UserNotFound extends ErrorBase {
    constructor(message: string) {
        super(message, 404)
    }
}