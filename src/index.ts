
import Server from './server/server';
//import router from './router/router';
import indexRoutes from './server/routers/index';

import { config } from './server/config/config';
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';
import env from './server/config/env';



//Set port 
const server = Server.init(env.PORT);

dotenv.config();

//parse applications/x-www-form-urlencoded
server.app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
server.app.use(bodyParser.json());


//connect database
// mongoose.connect(config.URI,{
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// })
//   .then(db => console.log('db online'))
//   .catch(err => console.log(err));

config.dbConeccion();

//all routeres
//server.app.use(router);
server.app.use('/api', indexRoutes);
  


server.start(() => {
  console.log(`servidor corriendo en el puerto ${env.PORT}`);
}); 