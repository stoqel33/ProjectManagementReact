import mongoose, { Schema } from 'mongoose'
import { IUser } from '../interfaces'

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email address is invalid'],
            unique: true,
            immutable: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must have minimum 8 characters']
        },
        avatar: { type: String }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model<IUser>('User', UserSchema)

export default User
