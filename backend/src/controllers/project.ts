import { Response, Request } from 'express'
import { IProject } from '../interfaces'
import { Project } from '../models'

const getProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.findById(req.body.id)

        if (req.user.id === project?.userId.toString()) {
            return res.status(200).json(project)
        } else {
            return res.status(200)
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

const getAllProjects = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1
    const pageSize = parseInt(req.query.pageSize as string) || 10
    const skipIndex = (page - 1) * pageSize

    try {
        const data = await Project.find({ userId: req.user.id })
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

const createProject = async (req: Request, res: Response) => {
    try {
        const {
            status,
            title,
            description,
            clientId,
            grossPrice,
            taxRate,
            netPrice,
            createdDate,
            deadline,
            category,
            subcontractorId,
            picture
        }: IProject = req.body

        const newProject = new Project({
            status,
            title,
            description,
            clientId,
            grossPrice,
            taxRate,
            netPrice,
            createdDate,
            deadline,
            category,
            subcontractorId,
            picture,
            userId: req.user.id
        })

        const createdProject = await newProject.save()

        const { _doc } = createdProject

        return res.status(201).json(_doc)
    } catch (err) {
        return res.status(500).json(err)
    }
}

const updateProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.findById(req.body.id)
        if (req.user.id === project?.userId.toString()) {
            const updatedProject = await Project.findByIdAndUpdate(
                req.body.id,
                {
                    $set: req.body
                },
                { new: true }
            )
            return res.status(200).json(updatedProject)
        }
        return res.status(200)
    } catch (err) {
        return res.status(500).json(err)
    }
}

const deleteProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.findById(req.body.id)
        if (req.user.id === project?.userId.toString()) {
            await Project.findByIdAndDelete(req.body.id)
            return res.status(200).json({ message: 'Project has been deleted' })
        }
        return res.status(200)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export default { getProject, getAllProjects, createProject, updateProject, deleteProject }
