import { Response, Request } from 'express'
import { sign } from 'jsonwebtoken'
import CryptoJS from 'crypto-js'

import { User } from '../models'

const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        User.findOne({ email }).then((existed: any) => {
            if (existed) {
                return res.status(200).redirect('/')
            }
        })

        const newUser = new User({
            email,
            password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY as string).toString()
        })

        const user = await newUser.save()

        return res.status(201).json(user)
    } catch (err) {
        return res.status(500).json(err)
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: 'Email or password is incorrect' })
        }

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY as string)
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

        if (originalPassword !== password) {
            return res.status(401).json({ message: 'Email or password is incorrect' })
        }

        const accessToken = sign({ id: user._id }, process.env.SECRET_KEY as string, {
            expiresIn: '24h'
        })

        return res.status(200).json({ token: accessToken })
    } catch (err) {
        return res.status(500).json(err)
    }
}

export default { register, login }
