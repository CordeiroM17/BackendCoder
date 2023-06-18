import express from "express";
import { cartsService } from "../services/carts.service.js";
export const cartsRoute = express.Router();

cartsRoute.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        console.log("entre al get, ID: ",cartId)
        const cart = await cartsService.getCartById(cartId);
        return res.status(201).json({
            status: "success",
            msg: `cartId: ${cartId}`,
            data: cart
        })
    } catch (error) {
        return res.status(500).json({ 
            status: "error", 
            msg: "something went wrong",
            data: {}
        });
    };
});

cartsRoute.post("/:cid/products/:pid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        await cartsService.addItemToCart(cartId, productId);
        const cart = await cartsService.getCartById(cartId);
        console.log("producto añadido")
        return res.status(201).json({
            status: "success",
            msg: "product added",
            data: cart
        });
    } catch (error) {
        return res.status(404).json({
            status: "error",
            msg: "product not added",
            data: {}
        });
    };
});

cartsRoute.delete("/:cid/products/:pid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        await cartsService.deleteProductFromCart(cartId, productId);
        return res.status(201).json({
            status: "success",
            msg: "product deleted from this cart",
            data: {}
        })
    } catch (error) {
        return res.status(404).json({
            status: "error",
            msg: "product not deleted to the cart",
            data: {}
        });
    };
});

cartsRoute.delete("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        await cartsService.deleteAllProductsFromCart(cartId);
        return res.status(201).json({
            status: "success",
            msg: "cart empty",
            data: {}
        })
    } catch (error) {
        return res.status(404).json({
            status: "error",
            msg: "cart not empty",
            data: {}
        });
    }
})