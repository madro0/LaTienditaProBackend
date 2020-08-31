"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
//import router from './router/router';
const index_1 = __importDefault(require("./server/routers/index"));
const config_1 = require("./server/config/config");
const body_parser_1 = __importDefault(require("body-parser"));
//Set port 
const server = server_1.default.init(config_1.config.PORT);
//parse applications/x-www-form-urlencoded
server.app.use(body_parser_1.default.urlencoded({ extended: false }));
//parse application/json
server.app.use(body_parser_1.default.json());
//connect database
// mongoose.connect(config.URI,{
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// })
//   .then(db => console.log('db online'))
//   .catch(err => console.log(err));
config_1.config.dbConeccion();
//all routeres
//server.app.use(router);
server.app.use('/api', index_1.default);
server.start(() => {
    console.log(`servidor corriendo en el puerto ${config_1.config.PORT}`);
});
