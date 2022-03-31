export class CustomResponse<T> {
    code: number
    message: string
    object?: T

    constructor(code: number, message: string, object?: T) {
        this.code = code
        this.message = message
        this.object = object
    }
}
