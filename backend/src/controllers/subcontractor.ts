import { Response, Request } from 'express'
import { ISubcontractor } from '../interfaces'
import { Subcontractor } from '../models'

const getSubcontractor = async (req: Request, res: Response) => {
    try {
        const subcontractor = await Subcontractor.findById(req.body.id)

        if (req.user.id === subcontractor?.userId.toString()) {
            return res.status(200).json(subcontractor)
        } else {
            return res.status(200)
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

const getAllSubcontractor = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1
    const pageSize = parseInt(req.query.pageSize as string) || 10
    const skipIndex = (page - 1) * pageSize

    try {
        const data = await Subcontractor.find({ userId: req.user.id })
            .sort({ _id: 1 })
            .limit(pageSize)
            .skip(skipIndex)
            .exec()

        return res.status(200).json({
            data,
            meta: {
                allItems: data.length,
                page,
                allPages: Math.ceil(data.length / pageSize),
                nextPage: Math.ceil(data.length / pageSize) > page,
                previousPage: page > 1
            }
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

const createSubcontractor = async (req: Request, res: Response) => {
    try {
        const {
            name,
            lastName,
            companyName,
            isRegular,
            email,
            phoneNumber,
            address,
            postalCode,
            invoices
        }: ISubcontractor = req.body

        const newSubcontractor = new Subcontractor({
            name,
            lastName,
            companyName,
            isRegular,
            ordersAmount: 1,
            email,
            phoneNumber,
            address,
            postalCode,
            invoices,
            userId: req.user.id
        })

        const createdSubcontractor = await newSubcontractor.save()

        const { _doc } = createdSubcontractor

        return res.status(201).json(_doc)
    } catch (err) {
        return res.status(500).json(err)
    }
}

const updateSubcontractor = async (req: Request, res: Response) => {
    try {
        const subcontractor = await Subcontractor.findById(req.body.id)
        if (req.user.id === subcontractor?.userId.toString()) {
            const updatedSubcontractor = await Subcontractor.findByIdAndUpdate(
                req.body.id,
                {
                    $set: req.body
                },
                { new: true }
            )
            return res.status(200).json(updatedSubcontractor)
        }
        return res.status(200)
    } catch (err) {
        return res.status(500).json(err)
    }
}

const deleteSubcontractor = async (req: Request, res: Response) => {
    try {
        const subcontractor = await Subcontractor.findById(req.body.id)
        if (req.user.id === subcontractor?.userId.toString()) {
            await Subcontractor.findByIdAndDelete(req.body.id)
            return res.status(200).json({ message: 'Subcontractor has been deleted' })
        }
        return res.status(200)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export default {
    getSubcontractor,
    getAllSubcontractor,
    createSubcontractor,
    updateSubcontractor,
    deleteSubcontractor
}
