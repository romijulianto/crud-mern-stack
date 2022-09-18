import express from "express";
import {
    getProduct,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
} from "../controllers/ProductController.js"

/* initiated route from express.Router */
const router = express.Router();

/* initiate method router.(get/post/delete/update) 
router.method('/endpointadress'), function from controller);
*/
router.get('/products', getProduct);
router.get('/products/:id', getProductById);
router.post('/products', saveProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;