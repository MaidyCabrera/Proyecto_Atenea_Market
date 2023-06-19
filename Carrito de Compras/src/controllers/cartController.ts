/**
 * Lógica de negocio para el microservicio carrito de Compras
 * @author Maidy Cabrera<maidyc914@gmail.com>
 */

import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { check, validationResult } from 'express-validator'

const prisma = new PrismaClient()

//
export const getCartProducts = async (req: Request, res: Response) => {

    const {userId} = req.params
    try {
        const cartProduct = await prisma.cart.findMany(
            {
                where:{
                    userId: parseInt(userId)
                }
            }
        )
        res.json(cartProduct)
    } catch (error) {
        console.log("ocurrió un error: ", error)
        res.status(503)
        res.json({ error: 'Service Unavailable' })
    }
}

export const addProductToCart = [

    check('productId').isNumeric().withMessage('El id del producto debe ser un numero'),
    check('quanty').isNumeric().withMessage('El id del producto debe ser un numero'),
    check('productId').isInt({ gt: 0 }).withMessage('El id del producto debe ser mayor a cero'),
    check('quanty').isInt({ gt: 0 }).withMessage('La cantidad del producto debe ser mayor a cero'),
    check('UserId').isNumeric().withMessage('El Id del usuario deber ser un número'),

    async (req: Request, res: Response) => {
        const erros = validationResult(req)
        if (!erros.isEmpty()) {
            res.status(400)
            res.json({ erros: erros.array() })
            return
        }
        const { productId, quantity, userId } = req.body
        try {

            const existingProduct = await prisma.cart.findFirst({
                where: {
                    productId: productId,
                    userId:userId
                }
            }
            )

            if(existingProduct){
                //Si existe el producto le suma la cantidad
                const updateCart= await prisma.cart.update(
                    {
                        where:{
                            id:existingProduct.id 
                        },
                        data:{
                            quantity:{
                                increment:quantity
                            }
                        }
                    }
                )
                res.json(updateCart)

            }else{

            const cartProduct = await prisma.cart.create(
                {
                    data: {
                        productId,
                        quantity,
                        userId
                    }
                }
            )
            res.json(cartProduct)
        }} catch (error) {
            console.log("No se pudo ingresar el producto al carrito: ", error)
            res.status(503)
            res.json({ error: 'Service Unavailable' })
        }
    }
]
