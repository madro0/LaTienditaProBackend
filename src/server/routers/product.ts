import { Router } from 'express';
import { productController } from '../controllers/productController';
import { auth } from '../middlewares/auth';

class ProductRouter{

  public router: Router = Router();


  constructor() {
    this.config();
  }

  config(): void{
    this.router.get('/:id',auth.verifyToken, productController.getProduct);
    this.router.get('',auth.verifyToken, productController.getAllProducts);
    this.router.post('',auth.verifyToken, productController.addProduct);
    this.router.put('/:id',auth.verifyToken, productController.updateProduct);
    this.router.delete('/:id',auth.verifyToken, productController.deleteProduct);
  }
}

const productRoutes = new ProductRouter();
export default productRoutes.router;

