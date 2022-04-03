import { Router } from 'express'
import verifyToken from '../config/verifyToken'

import invoice from '../controllers/invoice'

const router = Router()

router.get('', verifyToken, invoice.getInvoice)
router.post('', verifyToken, invoice.createInvoice)
router.put('', verifyToken, invoice.updateInvoice)
router.delete('', verifyToken, invoice.deleteInvoice)
router.get('/all', verifyToken, invoice.getAllInvoices)

export { router }
