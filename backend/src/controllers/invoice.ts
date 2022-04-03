import { Response, Request } from 'express'
import { IInvoice, InvoiceType } from '../interfaces'
import { Client, Invoice, Subcontractor } from '../models'

const getInvoice = async (req: Request, res: Response) => {
    try {
        const invoice = await Invoice.findById(req.body.id)

        if (req.user.id === invoice?.userId.toString()) {
            return res.status(200).json(invoice)
        } else {
            return res.status(200)
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

const getAllInvoices = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1
    const pageSize = parseInt(req.query.pageSize as string) || 10
    const skipIndex = (page - 1) * pageSize

    try {
        const data = await Invoice.find({ userId: req.user.id })
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

const createInvoice = async (req: Request, res: Response) => {
    try {
        const { name, clientId, subcontractorId, picture, projectId }: IInvoice = req.body

        const newInvoice = new Invoice({
            name,
            type: clientId ? InvoiceType.Client : InvoiceType.Subcontractor,
            clientId,
            subcontractorId,
            picture,
            projectId,
            userId: req.user.id
        })

        const createdInvoice = await newInvoice.save()

        clientId
            ? await Client.updateOne({ _id: clientId }, { $push: { invoices: createdInvoice._id } })
            : await Subcontractor.updateOne(
                  { _id: subcontractorId },
                  { $push: { invoices: createdInvoice._id } }
              )

        const { _doc } = createdInvoice

        return res.status(201).json(_doc)
    } catch (err) {
        return res.status(500).json(err)
    }
}

const updateInvoice = async (req: Request, res: Response) => {
    try {
        const invoice = await Invoice.findById(req.body.id)
        if (req.user.id === invoice?.userId.toString()) {
            const updatedInvoice = await Invoice.findByIdAndUpdate(
                req.body.id,
                {
                    $set: req.body
                },
                { new: true }
            )
            return res.status(200).json(updatedInvoice)
        }
        return res.status(200)
    } catch (err) {
        return res.status(500).json(err)
    }
}

const deleteInvoice = async (req: Request, res: Response) => {
    try {
        const invoice = await Invoice.findById(req.body.id)
        if (req.user.id === invoice?.userId.toString()) {
            await Invoice.findByIdAndDelete(req.body.id)
            await Client.updateOne(
                { _id: invoice?.clientId },
                { $pull: { invoices: invoice?._id } }
            )
            await Subcontractor.updateOne(
                { _id: invoice?.subcontractorId },
                { $pull: { invoices: invoice?._id } }
            )

            return res.status(200).json({ message: 'Invoice has been deleted' })
        }
        return res.status(200)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export default { getInvoice, getAllInvoices, createInvoice, updateInvoice, deleteInvoice }
