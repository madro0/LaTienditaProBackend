import { Router } from 'express';
import userRoutes from './usuario';
import loginRoutes from './login';
import categoryRoutes  from './category';
import providerRoutes  from './provider';
import productRoutes  from './product';
import searchRoutes from './search';
import uploadRoutes from "./upload";




const router: Router = Router();

//=================================
//Url (http://localhost:3000/api/)
//=================================


//=================================
//router user
//=================================
router.use('/user', userRoutes);
//=================================
//router login
//=================================
router.use('/login', loginRoutes);
//=================================
//router category
//=================================
router.use('/category', categoryRoutes);
//=================================
//router provider
//=================================
router.use('/provider', providerRoutes);
//=================================
//router product
//=================================
router.use('/product', productRoutes);
//=================================
//router search
//=================================
router.use('/search', searchRoutes);
//=================================
//Upload router
//=================================
router.use('/upload', uploadRoutes);


export default router;

