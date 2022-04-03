import mongoose, { Schema } from 'mongoose'
import { IClient } from '../interfaces'

const ClientSchema = new Schema(
    {
        name: { type: String, required: [true, 'Client name is required'] },
        lastName: { type: String, required: [true, 'Client last name is required'] },
        companyName: { type: String },
        isRegular: { type: Boolean, required: true },
        orders: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
        ordersAmount: { type: Number, required: true },
        email: { type: String },
        phoneNumber: { type: String, required: [true, 'Client phone number is required'] },
        address: { type: String, required: [true, 'Client address is required'] },
        postalCode: { type: String, required: [true, 'Client postal code is required'] },
        invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }],
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        projectId: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
    },
    {
        timestamps: true
    }
)

const Client = mongoose.model<IClient>('Client', ClientSchema)

export default Client
