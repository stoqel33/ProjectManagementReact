import { Router } from 'express'
import verifyToken from '../config/verifyToken'

import client from '../controllers/client'

const router = Router()

router.get('', verifyToken, client.getClient)
router.post('', verifyToken, client.createClient)
router.put('', verifyToken, client.updateClient)
router.delete('', verifyToken, client.deleteClient)
router.get('/all', verifyToken, client.getAllClients)

export { router }
