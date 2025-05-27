import express from "express";
import authMiddleware from "../middleware/auth.js";
import {placeOrder, verifyOrder,userOrders,listOrders, updateStatus,placeOrderCod} from '../controllers/orderController.js'

const orderRouter=express.Router();

orderRouter.post('/place',authMiddleware,placeOrder);

orderRouter.post('/cod',authMiddleware,placeOrderCod);

orderRouter.post('/verify',verifyOrder);
orderRouter.post('/userorders',authMiddleware,userOrders);
orderRouter.get('/list',listOrders);
orderRouter.post('/status',updateStatus);
export default orderRouter;