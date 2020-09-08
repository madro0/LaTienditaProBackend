import { Response, Router } from 'express';
import { verificationController } from '../controllers/verificationController';
import { auth } from '../middlewares/auth';

class UserRouter{

  public router: Router = Router();


  constructor() {
    this.config();
  }

  config(): void{
    this.router.get('/confirm/:email/:hash',verificationController.confirmEmail);
    this.router.post('/confirm/ressend-activation', verificationController.ressendActivation);
    
  }
  
}
const userRoutes = new UserRouter();
export default userRoutes.router;
