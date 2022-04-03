import { Response, Request } from 'express'
import { IClient } from '../interfaces'
import { Client } from '../models'

const getClient = async (req: Request, res: Response) => {
    try {
        const client = await Client.findById(req.body.id)

        if (req.user.id === client?.userId.toString()) {
            return res.status(200).json(client)
        } else {
            return res.status(200)
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

const getAllClients = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1
    const pageSize = parseInt(req.query.pageSize as string) || 10
    const skipIndex = (page - 1) * pageSize

    try {
        const data = await Client.find({ userId: req.user.id })
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

const createClient = async (req: Request, res: Response) => {
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
        }: IClient = req.body

        const newClient = new Client({
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

        const createdClient = await newClient.save()

        const { _doc } = createdClient

        return res.status(201).json(_doc)
    } catch (err) {
        return res.status(500).json(err)
    }
}

const updateClient = async (req: Request, res: Response) => {
    try {
        const client = await Client.findById(req.body.id)
        if (req.user.id === client?.userId.toString()) {
            const updatedClient = await Client.findByIdAndUpdate(
                req.body.id,
                {
                    $set: req.body
                },
                { new: true }
            )
            return res.status(200).json(updatedClient)
        }
        return res.status(200)
    } catch (err) {
        return res.status(500).json(err)
    }
}

const deleteClient = async (req: Request, res: Response) => {
    try {
        const client = await Client.findById(req.body.id)
        if (req.user.id === client?.userId.toString()) {
            await Client.findByIdAndDelete(req.body.id)
            return res.status(200).json({ message: 'Client has been deleted' })
        }
        return res.status(200)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export default { getClient, getAllClients, createClient, updateClient, deleteClient }
