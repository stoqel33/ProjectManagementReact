import { Document, Types } from 'mongoose'

export default interface ISubcontractor extends Document {
    name: string
    lastName: string
    companyName?: string
    isRegular: boolean
    ordersAmount: number
    email?: string
    phoneNumber: string
    address: string
    postalCode: string
    invoices?: Types.ObjectId[]
    userId: Types.ObjectId
    projectId?: Types.ObjectId[]
}
