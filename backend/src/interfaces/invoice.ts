import { Document, Types } from 'mongoose'

export enum InvoiceType {
    Client = 'Client',
    Subcontractor = 'Subcontractor'
}

export default interface IInvoice extends Document {
    name: string
    type: InvoiceType
    userId: Types.ObjectId
    netPrice?: number
    grossPrice: number
    clientId?: Types.ObjectId
    subcontractorId?: Types.ObjectId
    picture?: string
    projectId?: Types.ObjectId[]
}
