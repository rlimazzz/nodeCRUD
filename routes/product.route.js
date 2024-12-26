import express from 'express'
import {getProducts, postProducts, updateProducts, deleteProducts} from '../controllers/product.controller.js'

const router = express.Router()

router.get('/', getProducts)

router.post('/', postProducts)

router.put('/:id', updateProducts)

router.delete('/:id', deleteProducts)

export default router