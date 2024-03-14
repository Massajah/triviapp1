import { Router } from "express";
const router = Router()
import * as controller from '../controllers/controller.js'

router.route('/result')
    .get(controller.getResult)
    .post(controller.storeResult)
    .delete(controller.dropResult)

export default router