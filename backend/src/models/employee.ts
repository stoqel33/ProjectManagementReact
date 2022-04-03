import mongoose, { Schema } from 'mongoose'
import { IEmployee } from '../interfaces'

const EmployeeSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        type: { type: String, required: true },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        birthday: { type: Date },
        grossSalary: { type: Number },
        netSalary: { type: Number },
        bonusPayment: [{ name: String, amount: Number, project: Schema.Types.ObjectId }],
        picture: { type: String },
        projectId: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
    },
    {
        timestamps: true
    }
)

const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema)

export default Employee
