import { Router } from 'express';
import { uploadController } from "../controllers/uploadController";
import { auth } from "../middlewares/auth";
import fileUpload from "express-fileupload";
class UploadRouter{
    
    public router: Router = Router();
    
    constructor(){
        this.config();
    }

    config():void {

        this.router.use(fileUpload()); //<= Este es un middeware para poder usar express-fileupload 
        this.router.put('/:tipo/:id',auth.verifyToken, uploadController.uploadFile);
        this.router.get('/:tipo/:img',auth.verifyToken, uploadController.getImage);
    }
}

const uploadRoutes = new UploadRouter();
export default uploadRoutes.router;