import mongoose, { Schema } from 'mongoose'
import { ISubcontractor } from '../interfaces'

const SubcontractorSchema = new Schema<ISubcontractor>(
    {
        name: { type: String, required: [true, 'Name is required'] },
        lastName: { type: String, required: [true, 'Last name is required'] },
        companyName: { type: String },
        isRegular: { type: Boolean, required: true },
        ordersAmount: { type: Number, required: true },
        email: { type: String },
        phoneNumber: { type: String, required: [true, 'Phone number is required'] },
        address: { type: String, required: [true, 'Address is required'] },
        postalCode: { type: String, required: [true, 'Postal code is required'] },
        invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }],
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        projectId: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
    },
    {
        timestamps: true
    }
)

const Subcontractor = mongoose.model<ISubcontractor>('Subcontractor', SubcontractorSchema)

export default Subcontractor
