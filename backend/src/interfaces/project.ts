import { Document, Types } from 'mongoose'

export enum ProjectStatus {
    Initial = 'Initial',
    InProgress = 'InProgress',
    TestingPhase = 'TestingPhase',
    PendingApproval = 'PendingApproval',
    Done = 'Done',
    ProblemNotified = 'ProblemNotified',
    NotApproved = 'NotApproved'
}

export default interface IProject extends Document {
    status: ProjectStatus
    title: string
    description: string
    clientId: Types.ObjectId
    userId: Types.ObjectId
    grossPrice: number
    taxRate: number
    netPrice: number
    createdDate: Date
    startDate: Date
    plannedEndDate: Date
    category?: string
    subcontractorId?: Types.ObjectId
    picture?: string
}
