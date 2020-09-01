
import Server from './server/server';
import indexRoutes from './server/routers/index';
import { config } from './server/config/config';
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';
import env from './server/config/env';
import cors  from "cors";

//Set port 
const server = Server.init(env.PORT);

dotenv.config();

//parse applications/x-www-form-urlencoded
server.app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
server.app.use(bodyParser.json());
//midelwars
// server.app.use(cors);


//connect database
config.dbConeccion();

//all routeres
//server.app.use(router);
server.app.use('/api', indexRoutes);
  

//Start server
server.start(() => {
  console.log(`servidor corriendo en el puerto ${env.PORT}`);
}); 