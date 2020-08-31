"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Config {
    constructor() {
        //=======================================
        //PUERTO!
        //=======================================
        this.PORT = process.env.PORT || '3000';
        //=======================================
        //URI Database!
        //=======================================
        this.URI = 'mongodb+srv://madro:K8mwWFepr8Gmc73s@cluster0.yugug.mongodb.net/latiendita';
        //'mongodb://localhost:27017/Lt';
        //=======================================
        //SEED de autenticación (jwt) 
        //=======================================
        this.SEED = process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';
        //=======================================
        //Vencimiento de token
        //=======================================
        this.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN = '48h';
        //=======================================
        //conecion base de datos
        //=======================================
        this.dbConeccion = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(this.URI, {
                    useCreateIndex: true,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false
                });
                console.log('DB Online');
            }
            catch (err) {
                console.log(err);
                throw new Error('error a la hora de iniciar db');
            }
        });
    }
}
exports.config = new Config();
