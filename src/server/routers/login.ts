import { Router } from 'express';
import { loginController} from '../controllers/loginController';




class Login {
  public router: Router = Router();
  
  constructor() {
    this.config();
  }
  private config(): void{

    this.router.post('', loginController.login);
  
  }

}
const login = new Login();
export default login.router;