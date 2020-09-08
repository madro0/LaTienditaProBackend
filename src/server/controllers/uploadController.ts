import { Response, Request } from "express";
import { v4 as uuidv4 } from 'uuid';
import { updateImage } from '../helpers/updateImage';
import fileUpload from 'express-fileupload';
import fs from "fs";
import path from 'path';
class UploadController {

    public async uploadFile(req: Request, res: Response) {

        const tipo = req.params.tipo;
        const id = req.params.id;

        //validar que el tipo sea user/product
        const tiposValidos = ['user', 'product'];

        if (!tiposValidos.includes(tipo)) {
            return res.status(400).json({
                ok: false,
                message: 'No es un usuario o un producto (user/product)'
            });
        }

        
        //validar que por lo menos haya adjuntado una imagen.
        if (!req.files || Object.keys(req.files).length === 0 ) {
            return res.status(500).json({
                ok: false,
                message: 'No Adjunto ningun archivo '
            });
        }
        //Procesar imagen
        const file: any= req.files.field;
        
        //console.log( file.length);
        //cuando es indefinido quire decir que no es un Objeto, pues solo esta enviando un archivo,
        //Sin embargo cuando envia mas de un archivo la variable file es de type object.

        //validar que solo sea una imagen  
        if( Object.keys(file).length >=2 && file.length != undefined ){
            return res.status(500).json({
                ok: false,
                message: 'Adjunto mas de un archivo '
            });
        }
        
        const nombreCortado = file.name.split('.');

        const extensionArchivo = nombreCortado[nombreCortado.length - 1];
       
        //validar extensiones
        const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

        if (!extensionesValidas.includes(extensionArchivo)) {
            return res.status(500).json({
                ok: false,
                message: 'Extensión del archivo no permitida'
            });
        }
        //Generar el nombre del archivo
        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
        //Guardar la imagen
        const path = `./src/server/uploads/${tipo}/${nombreArchivo}`;
        //Mover imagen

        try {

            await file.mv(path);
            const resultSaveDB = await updateImage.updateImages( tipo, id, nombreArchivo );
            
            //si resultSaveDB es false quiere decir que hubo un error al subir la imagen.
            if(!resultSaveDB){
                fs.unlinkSync(path);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al guardar img en DB, img borrada del directorio '
                });
            }

            res.json({
                ok: true,
                img: nombreArchivo,
                message: 'Imagen guardada en db y server correctamente'
            });

        } catch (err) {

            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

    }
    public getImage(req: Request, res: Response){

        const tipo = req.params.tipo;
        const img = req.params.img;
        const pathString:string =  `../uploads/${tipo}/${img}`;
        let pathImg = path.join(__dirname, pathString);
        
        if(!fs.existsSync(pathImg)){
            pathImg= path.join(__dirname,`../uploads/no-image-found.jpg` );
            res.sendFile(pathImg);
        }
    
        res.sendFile(pathImg);
    
    }
}

export const uploadController = new UploadController();
