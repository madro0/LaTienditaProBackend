import { Router } from 'express';
import {searchController} from '../controllers/searchController';
import { auth } from "../middlewares/auth";
class SearchRouter{
    
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void {
        this.router.get('/:busqueda',auth.verifyToken, searchController.searchAll);
        this.router.get('/:table/:search',auth.verifyToken, searchController.searchByTable);
    }
}

const searchRoutes = new SearchRouter();
export default searchRoutes.router;