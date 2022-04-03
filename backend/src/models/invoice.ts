import mongoose, { Schema } from 'mongoose'
import { IInvoice, InvoiceType } from '../interfaces'

const InvoiceSchema = new Schema<IInvoice>(
    {
        name: { type: String, required: [true, 'Invoice name is required'] },
        type: {
            type: String,
            required: [true, 'Invoice type is required'],
            enum: InvoiceType
        },
        netPrice: { type: Number },
        grossPrice: { type: Number, required: [true, 'Gross price is required'] },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
        subcontractorId: { type: Schema.Types.ObjectId },
        picture: { type: String },
        projectId: { type: Schema.Types.ObjectId, ref: 'Project' }
    },
    {
        timestamps: true
    }
)

const Invoice = mongoose.model<IInvoice>('Invoice', InvoiceSchema)

export default Invoice
