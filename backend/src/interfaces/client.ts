import { Document, Types } from 'mongoose'

export default interface IClient extends Document {
    name: string
    lastName: string
    companyName?: string
    isRegular: boolean
    orders?: Types.ObjectId[]
    ordersAmount: number
    email?: string
    phoneNumber: number
    address: string
    postalCode: string
    invoices?: Types.ObjectId[]
    userId: Types.ObjectId
    projectId: Types.ObjectId[]
}
