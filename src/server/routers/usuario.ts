import { Router } from 'express';
import { userController } from '../controllers/userController';
import { auth } from '../middlewares/auth';


class UserRouter{

  public router: Router = Router();


  constructor() {
    this.config();
  }

  config(): void{
    this.router.get('/:id',auth.verifyToken,auth.verifyRole, userController.getUser);
    this.router.get('',auth.verifyToken,auth.verifyRole, userController.getAllUsers);
    this.router.post('',auth.verifyToken,auth.verifyRole, userController.addUser);
    this.router.put('/:id',auth.verifyToken,auth.verifyRole, userController.updateUser);
    this.router.delete('/:id',auth.verifyToken,auth.verifyRole, userController.deleteUser);
  }
}
const userRoutes = new UserRouter();
export default userRoutes.router;
