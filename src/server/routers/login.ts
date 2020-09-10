import { Router } from 'express';
import { loginController} from '../controllers/loginController';
import { userController } from '../controllers/userController';
import { auth } from '../middlewares/auth';
const { LoginValidation, restorePasswordValidation,verifyRestorePasswordValidation }  = require ('../middlewares/validations');



class Login {
  public router: Router = Router();
  
  constructor() {
    this.config();
  }
  private config(): void{

    this.router.post('',LoginValidation(), loginController.login);
    this.router.post('/restore/:token',restorePasswordValidation(), auth.decodeTokenRestorePassword, userController.restorePassword);
    this.router.get('/restore/:token',auth.verifyTokenRestorePassword);
    this.router.post('/restore',verifyRestorePasswordValidation(), userController.forgetPassword)
  
  }

}
const login = new Login();
export default login.router;