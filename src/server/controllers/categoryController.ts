import { Request, Response, request, response } from 'express';
import _ from 'underscore';
import categoryModel from '../models/categoryModel';
import { Category } from '../models/categoryModel';



class CategoryController {

  public getCategory(req: Request, res: Response) {
    
    let id = req.params.id;
    
    categoryModel.findOne({ '_id': id, state: true }, (err, categoryDB:any) => {
      
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

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
      })
    });
  }

  public getAllCategories(req: Request, res: Response) {
    
    categoryModel.find({ state: true }, (err, categoriesDB) => {
      
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      categoryModel.countDocuments({ state: true }, (err, count) => {
        
        res.json({
          ok: true,
          categories: categoriesDB,
          totalCategories: count
        });
      });
    });
  }

  public addCategory(req: Request, res: Response) {
    let body = req.body;

    let category = new categoryModel({
      name: body.name,
      description: body.description,
      user: body.user,
    });
    
    category.save((err, categoryDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        message: `New category ${categoryDB.name} successfully created`,
        category: categoryDB
      });
    });
  }

  public updateCategory(req: Request, res: Response) {

    const id: string = req.params.id;

    let body = _.pick(req.body, ['name', 'description']);

    categoryModel.findByIdAndUpdate(id, body, { new: true, runValidators: true,  context : 'query'  }, (err, categoryDB:any) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        message: `Category ${categoryDB.name} successfully updated`,
        category: categoryDB
      });
      
    });
  }

  public deleteCategory(req: Request, res: Response) {
  
    const id: string = req.params.id;

    let vody = { state: false };

    categoryModel.findOne({ '_id': id }, (err, categoryDB) => {
      
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if (!categoryDB) {
        return res.status(400).json({
          ok: false,
          message: 'There is no active category with this id'
        })
      }

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
        
      })

    });
  }
}

export const categoryController = new CategoryController(); 