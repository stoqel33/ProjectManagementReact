import { Response, Request } from 'express'
import CryptoJS from 'crypto-js'
import { User } from '../models'

const getUser = async (req: Request, res: Response) => {
    if (req.user.id == req.body.id) {
        try {
            const user = await User.findById(req.user.id)
            return res.status(200).json({ email: user?.email })
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403)
    }
}

const updateUser = async (req: Request, res: Response) => {
    if (req.user?.id == req.body.id) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY as string
            ).toString()
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.body.id,
                {
                    $set: req.body
                },
                { new: true }
            )
            return res.status(200).json(updatedUser)
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403)
    }
}

const deleteUser = async (req: Request, res: Response) => {
    if (req.user?.id == req.body.id) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY as string
            ).toString()
        }

        try {
            await User.findOneAndDelete(req.user)
            return res.status(200).json({ message: 'User has been deleted' })
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403)
    }
}

export default { getUser, updateUser, deleteUser }
