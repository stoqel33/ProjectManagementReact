declare namespace Express {
    export interface Request {
        user: any
    }
}

declare module 'mongoose' {
    export interface Document {
        _doc: any
    }
}
