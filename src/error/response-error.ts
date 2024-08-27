export class ResponseError extends Error{
    statusCode(statusCode: any) {
        throw new Error("Method not implemented.");
    }
    constructor (public status : number ,public message : string){
        super(message);
    }
}