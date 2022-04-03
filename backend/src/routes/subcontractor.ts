import { Router } from 'express'
import verifyToken from '../config/verifyToken'

import subcontractor from '../controllers/subcontractor'

const router = Router()

router.get('', verifyToken, subcontractor.getSubcontractor)
router.post('', verifyToken, subcontractor.createSubcontractor)
router.put('', verifyToken, subcontractor.updateSubcontractor)
router.delete('', verifyToken, subcontractor.deleteSubcontractor)
router.get('/all', verifyToken, subcontractor.getAllSubcontractor)

export { router }
