import express, { Router } from 'express';
import { addProductToCart, getCartProducts } from '../controllers/cartController';

/**
 * Rutas del microservicio Carrito de COmpras
 * @author Maidy Cabrera<maidyc914@gmail.com>
 */
const myRouter:Router= Router()

myRouter.get('/', getCartProducts)
myRouter.post('/', addProductToCart)

export default myRouter

