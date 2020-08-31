import { Router } from 'express';
import { providerController } from '../controllers/providerController';
import { auth } from '../middlewares/auth';

class ProviderRouter{

  public router: Router = Router();


  constructor() {
    this.config();
  }

  config(): void{
    this.router.get('/:id',auth.verifyToken,auth.verifyRole, providerController.getProvider);
    this.router.get('',auth.verifyToken,auth.verifyRole, providerController.getAllProviders);
    this.router.post('',auth.verifyToken,auth.verifyRole, providerController.addProvider);
    this.router.put('/:id',auth.verifyToken,auth.verifyRole, providerController.updateProvider);
    this.router.delete('/:id',auth.verifyToken,auth.verifyRole, providerController.deleteUser);
  }
}

const providerRoutes = new ProviderRouter();
export default providerRoutes.router;
