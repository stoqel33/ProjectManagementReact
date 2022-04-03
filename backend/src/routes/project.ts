import { Router } from 'express'
import verifyToken from '../config/verifyToken'

import project from '../controllers/project'

const router = Router()

router.get('', verifyToken, project.getProject)
router.post('', verifyToken, project.createProject)
router.put('', verifyToken, project.updateProject)
router.delete('', verifyToken, project.deleteProject)
router.get('/all', verifyToken, project.getAllProjects)

export { router }
