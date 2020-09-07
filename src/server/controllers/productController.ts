import {Request, Response} from 'express';
import productModel from '../models/productModel';
import bcrypt from 'bcrypt';
import _ from 'underscore';



class ProductController {


  public async getProduct(req: Request, res: Response) {
    let id = req.params.id;

    try {
      let productDB = await productModel.find()
      .where('_id').equals(id)
      .where('active').equals(true);

      if ( !productDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'No hay ningun ningun producto activo con este id'
          }
        });
      }
    
      res.json({
        ok: true,
        product: productDB
      });

    } catch (err) {

      return res.status(500).json({
        ok: false,
        err
      });
    }

  }

  public async getAllProducts(req: Request, res: Response) {

    let from = req.query.from || 0;
    from = Number(from);
    
    let limit = req.query.limit || 100;
    limit = Number(limit);

    const campos = 'name description img category provider purchasePrice unitPrice wholesalePrice iva creationDate modificationDate active'
    try {
      
      let productsDB= await productModel.find({ active: true }, campos)
      .skip(from)
      .limit(limit);

      productModel.countDocuments({ active: true })
        .exec((err, count) => {
        res.json({
          ok: true,
          products: productsDB,
          totalproducts: count,
          from,
          limit
        });
      });

    } catch (err) {

      return res.status(400).json({
        ok: false,
        err
      });
    }
   
  }

  public async addProduct(req: Request, res: Response) {
    
    let body = req.body;
    
    let product = new productModel({
      name: body.name,
      description: body.description,
      img: body.img,
      category: body.category,
      provider: body.provider,
      purchasePrice: body.purchasePrice,
      unitPrice: body.unitPrice,
      wholesalePrice: body.wholesalePrice,
      iva: body.iva,
      user: body.user,
      creationDate: new Date(),
      modificationDate: new Date(),
    });
    try {

      let productDB= await product.save();
      res.json({
        ok: true,
        product: productDB
      });

    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
   
  }

  public async updateProduct(req: Request, res: Response) {

    const id: string = req.params.id;
    let body = req.body;
    try {
      let productDB =await productModel.find().where('_id').equals(id).where('active').equals(true);

      
      if (!productDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'No hay ningun ningun producto activo con este id'
          }
        });
      }

      let product = {
        name: body.name,
        description: body.description,
        category: body.category,
        provider: body.provider,
        purchasePrice: body.purchasePrice,
        unitPrice: body.unitPrice,
        wholesalePrice: body.wholesalePrice,
        iva: body.iva,      
        modificationDate: new Date()
      };
      try {
         let productUpdated = await productModel.findByIdAndUpdate(id, product, { new: true, runValidators: true });
         res.json({
          ok: true,
          producto: productUpdated,
          message: 'Producto Actualizado'
        });
      } catch (err) {
        return res.status(500).json({
            ok: false,
            err: err
          });
      }
     
    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }
   
    

    

  }
 
  public async deleteProduct(req:Request, res:Response) {
    
    const id: string = req.params.id;

    let body = { active: false };
    
    try {
      
      let productDB = await  productModel.findByIdAndUpdate(id, body, { new: true, runValidators: true });

      res.json({
        ok: true,
        message: 'Product Delete_1',
        product: productDB
        //================
        //NOTAS:
        //Delete_1 se cambio simplemente de estado activo: false
        //Delete_0 se elimina completamente la Db
        //================
      });

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }
    
  } 
 
}


export const productController = new ProductController();