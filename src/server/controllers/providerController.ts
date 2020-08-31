import {Request, Response} from 'express';
import providerModel from '../models/providerModel';
import _ from 'underscore';

class ProviderController {


  public getProvider(req: Request, res: Response) {
    let id = req.params.id;


    providerModel.find()
      .where('_id').equals(id)
      .where('active').equals(true)
      .exec((err, providerDB) => {
        
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if ( Object.keys(providerDB).length === 0) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'No hay ningun producto activo con este id'
          }
        })
      }
    
      res.json({
        ok: true,
        provider: providerDB
      })

    });
  }

  public getAllProviders(req: Request, res: Response) {

    
    providerModel.find({ active: true }, 'name nit cel phone web address')
      .exec((err, providers) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err
          });
        }

        providerModel.countDocuments({ state: true })
          .exec((err, count) => {
          res.json({
            ok: true,
            providers,
            totalProviders: count
          });
        });

      });
  }

  public addProvider(req: Request, res: Response) {
    
    let body = req.body;
    
    let provider = new providerModel({
      name: body.name,
      nit: body.nit,
      cel: body.cel,
      phone: body.phone,
      web: body.web,
      address: body.address
    });
    
    provider.save((err, providerDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        provider: providerDB
      });
    })

  }

  public updateProvider(req: Request, res: Response) {

    const id: string = req.params.id;
    
    let body = _.pick(req.body, ['name', 'nit', 'cel', 'phone', 'web', 'address']);

    providerModel.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
      
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        user: userDB
      })

    })

  }
 
  public deleteUser(req:Request, res:Response) {
    
    const id: string = req.params.id;

    let body = { active: false };
    

    providerModel.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, providerDB) => {
      
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        message: 'provider Delete_1',
        provider: providerDB

        //================
        //NOTAS:
        //Delete_1 se cambio simplemente de estado
        //Delete_0 se elimina completamente la Db
        //================
      });

    });
  }
}


export const providerController = new ProviderController();