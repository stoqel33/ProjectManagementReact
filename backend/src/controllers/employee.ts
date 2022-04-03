import { Response, Request } from 'express'
import { IEmployee } from '../interfaces'
import { Employee } from '../models'

const getEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await Employee.findById(req.body.id)

        if (req.user.id === employee?.userId.toString()) {
            return res.status(200).json(employee)
        } else {
            return res.status(200)
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

const getAllEmployees = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1
    const pageSize = parseInt(req.query.pageSize as string) || 10
    const skipIndex = (page - 1) * pageSize

    try {
        const data = await Employee.find({ userId: req.user.id })
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

const createEmployee = async (req: Request, res: Response) => {
    try {
        const {
            type,
            name,
            surname,
            birthday,
            grossSalary,
            netSalary,
            bonusPayment,
            picture,
            projectId
        }: IEmployee = req.body

        const newEmployee = new Employee({
            type,
            name,
            surname,
            birthday,
            grossSalary,
            netSalary,
            bonusPayment,
            picture,
            projectId,
            userId: req.user.id
        })

        const createdEmployee = await newEmployee.save()

        const { _doc } = createdEmployee

        return res.status(201).json(_doc)
    } catch (err) {
        return res.status(500).json(err)
    }
}

const updateEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await Employee.findById(req.body.id)
        if (req.user.id === employee?.userId.toString()) {
            const updatedEmployee = await Employee.findByIdAndUpdate(
                req.body.id,
                {
                    $set: req.body
                },
                { new: true }
            )
            return res.status(200).json(updatedEmployee)
        }
        return res.status(200)
    } catch (err) {
        return res.status(500).json(err)
    }
}

const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await Employee.findById(req.body.id)
        if (req.user.id === employee?.userId.toString()) {
            await Employee.findByIdAndDelete(req.body.id)
            return res.status(200).json({ message: 'Employee has been deleted' })
        }
        return res.status(200)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export default {
    getEmployee,
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
}
