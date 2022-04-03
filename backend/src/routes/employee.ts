import { Router } from 'express'
import verifyToken from '../config/verifyToken'

import employee from '../controllers/employee'

const router = Router()

router.get('', verifyToken, employee.getEmployee)
router.post('', verifyToken, employee.createEmployee)
router.put('', verifyToken, employee.updateEmployee)
router.delete('', verifyToken, employee.deleteEmployee)
router.get('/all', verifyToken, employee.getAllEmployees)

export { router }
