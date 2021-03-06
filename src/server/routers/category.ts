import { Router } from 'express';
import {categoryController} from '../controllers/categoryController'
import { auth } from '../middlewares/auth';
const  validations = require('../middlewares/validations')




class Login {
  public router: Router = Router();
  
  constructor() {
    this.config();
  }
  private config(): void{

    this.router.get('',auth.verifyToken, categoryController.getAllCategories);
    this.router.get('/:id',auth.verifyToken, categoryController.getCategory);
    this.router.post('',validations.categoryAddValidation(), auth.verifyToken, categoryController.addCategory);
    this.router.put('/:id',validations.categoryUpdateValidation(),auth.verifyToken, categoryController.updateCategory);
    this.router.delete('/:id',auth.verifyToken, categoryController.deleteCategory);
  
  }

}
const login = new Login();
export default login.router;