import { Router } from 'express'
import verifyToken from '../config/verifyToken'

import user from '../controllers/user'

const router = Router()

router.get('', verifyToken, user.getUser)
router.post('', verifyToken, user.updateUser)
router.delete('', verifyToken, user.deleteUser)

export { router }
