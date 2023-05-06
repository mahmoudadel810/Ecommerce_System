import { Router } from 'express'
import auth from '../../middleware/auth.js'
import { validation } from '../../middleware/validation.js'
import { asyncHandler } from '../../utils/errorHandling.js'
import { fileUpload } from '../../utils/multer.js'
import * as controller from './product.controller.js'
import { addProductSchema, Headers } from './product.validation.js'
const router = Router()

// router.get('/', (req, res) => {
//     res.status(200).json({ message: "product Module" })
// })

router.post(
  '/addProduct',
  validation(Headers, true),
  auth(),
  fileUpload({}).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 2 },
  ]),
  validation(addProductSchema),
  asyncHandler(controller.addProduct),
)

router.put(
  '/updateProduct/:productId',
  validation(Headers, true),
  auth(),
  fileUpload({}).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 2 },
  ]),
  // validation(addProductSchema),
  asyncHandler(controller.updateProduct),
)

router.get('/productList', asyncHandler(controller.productList))
export default router
