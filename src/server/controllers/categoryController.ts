import { Request, Response, request, response } from 'express';
import _ from 'underscore';
import categoryModel from '../models/categoryModel';
import { Category } from '../models/categoryModel';



class CategoryController {

  public async getCategory (req: Request, res: Response) {
    
    let id = req.params.id;
    
    try {
      let categoryDB = await categoryModel.findOne({ '_id': id, state: true });

      if (!categoryDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'There is no active category with this id'
          }
        });
      }

      res.json({
        ok: true,
        category: categoryDB
      });
      
    } catch (err) {
      return res.status(500).json({
          ok: false,
          err
        });
    }
    
  }

  public async getAllCategories(req: Request, res: Response) {
    

    try {
      let categoriesDB = await categoryModel.find({ state: true });
      
      categoryModel.countDocuments({ state: true }, (err, count) => {
        
        res.json({
          ok: true,
          categories: categoriesDB,
          totalCategories: count
        });
      });

    } catch (err) {
      return res.status(400).json({
          ok: false,
          err
      });
    }
    
    
  }

  public async addCategory(req: Request, res: Response) {
    let body = req.body;

    let category = new categoryModel({
      name: body.name,
      description: body.description,
      user: body.user,
    });

    try {
      let categoryDB = await category.save();

      res.json({
        ok: true,
        message: `New category ${categoryDB.name} successfully created`,
        category: categoryDB
      });

    } catch (err) {
      return res.status(400).json({
          ok: false,
          err
        });
    }
    
  }

  public async updateCategory(req: Request, res: Response) {

    const id: string = req.params.id;

    let body = _.pick(req.body, ['name', 'description']);

    try {
      let categoryDB: any = await categoryModel.findByIdAndUpdate(id, body, { new: true, runValidators: true,  context : 'query'  });
      res.json({
        ok: true,
        message: `Category ${categoryDB.name} successfully updated`,
        category: categoryDB
      });

    } catch (err) {

      return res.status(400).json({
        
        ok: false,
        err
      });
    }
    
  }

  public async deleteCategory(req: Request, res: Response) {
  
    const id: string = req.params.id;

    try {
      let categoryDB= await categoryModel.findOne({ '_id': id });
      
      if (!categoryDB) {
        return res.status(400).json({
          ok: false,
          message: 'There is no active category with this id'
        })
      };

      categoryDB.state = false;

      categoryDB.save((er, categoryDeleted) => {
        if (er) {
          return res.status(500).json({
              ok: false,
              err: er
          });
        }
        res.json({
          ok: true,
          category: categoryDeleted,
          message: 'Category successfully deleted'
        });
        
      });
      
    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }


      
      

      

     

  }
}

export const categoryController = new CategoryController(); 