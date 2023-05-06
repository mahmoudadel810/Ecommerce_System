import { Router } from "express";
import { asyncHandler } from '../../utils/errorHandling.js'
import { addReview } from "./reviews.controller";

const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"reviews Module"})
})

router.post('/addReview/:productId',auth(),asyncHandler(addReview))



export default router