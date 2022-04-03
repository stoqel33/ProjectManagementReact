import mongoose, { Schema } from 'mongoose'
import { IProject, ProjectStatus } from '../interfaces'

const ProjectSchema = new Schema(
    {
        status: {
            type: String,
            required: true,
            enum: ProjectStatus
        },
        title: { type: String, required: [true, 'Status is required'] },
        description: { type: String, required: [true, 'Description is required'] },
        clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        grossPrice: { type: Number, required: [true, 'Gross price is required'] },
        taxRate: { type: Number, required: [true, 'Tax rate is required'] },
        netPrice: { type: Number, required: true },
        createdDate: { type: Date, required: [true, 'Created date is required'] },
        deadline: { type: Date, required: [true, 'Deadline is required'] },
        category: { type: String },
        subcontractorId: [{ type: Schema.Types.ObjectId, ref: 'Subcontractor' }],
        picture: { type: String }
    },
    {
        timestamps: true
    }
)

const Project = mongoose.model<IProject>('Project', ProjectSchema)

export default Project
