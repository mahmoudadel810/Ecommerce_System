import orderModel from '../../../DB/model/Order.model.js'
import productModel from '../../../DB/model/Product.model.js'
import reviewModel from '../../../DB/model/Reviews.model.js'



export const addReview = async (req, res, next) => {
  const { productId } = req.params
  // product Id
  const Product = await productModel.findById(productId)
  if (!Product) {
    return next(new Error('in-valid productId', { cause: 400 }))
  }
  // user buy the product
  const orders = await orderModel.find({
    userId: req.user._id,
    orderStatus: 'delivered',
    'products.productId': productId,
  })
  if (!orders.length) {
    return next(
      new Error('you canot review product before buy it', { cause: 400 }),
    )
  }
  const review = await reviewModel.create({
    userId: req.user._id,
    productId,
    text: req.body.text,
    rate: req.body.rate,
  })
  return res.status(201).json({ message: 'Done', review })
}
