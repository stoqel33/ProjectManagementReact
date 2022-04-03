import { Types } from 'mongoose'

export default interface IEmployee extends Document {
    userId: Types.ObjectId
    type: string
    name: string
    surname: string
    birthday?: Date
    grossSalary?: number
    netSalary?: number
    bonusPayment?: number
    picture?: string
    projectId?: Types.ObjectId[]
}
