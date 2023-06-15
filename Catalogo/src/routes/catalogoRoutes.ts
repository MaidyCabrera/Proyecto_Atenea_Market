import express, { Router } from 'express';
import { getProductInventory } from '../controllers/catalogoController';

/**
 * Rutas del microservicio Carrito de COmpras
 * @author Maidy Cabrera<maidyc914@gmail.com>
 */
const myRouter:Router= Router()

myRouter.get('/:idProducto', getProductInventory)

export default myRouter

