import { Response, Request } from "express";
import userModel from "../models/userModel";
import productModel from "../models/productModel";
import providerModel from "../models/providerModel";
import categoryModel from "../models/categoryModel";

class SearchController {
  public async searchAll(req: Request, res: Response) {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, "i");

    try {
      const [users, products, prodividers] = await Promise.all([
        userModel.find({ name: regex, state: true }),
        productModel.find({ name: regex, active: true }),
        providerModel.find({ name: regex, active: true }),
      ]);

      res.json({
        ok: true,
        busqueda,
        users,
        products,
        prodividers,
      });
    } catch (err) {
      return res.status(500).json({
        ok: false,
      });
    }
  }

  public async searchByTable(req: Request, res: Response) {
    const busqueda = req.params.search;
    const tabla = req.params.table;
    const regex = new RegExp(busqueda, "i");

    let data = [];

    switch (tabla) {
      case "users":
        data = await userModel.find({ name: regex });
        break;
        
      case "products":
        data = await productModel.find({ name: regex, active: true });
        break;

      case "providers":
        data = await providerModel.find({ name: regex, active: true });
        break;

      case "categories":
        data = await categoryModel.find({ name: regex, active: true });
        break;

      default:
        return res.status(400).json({
          ok: false,
          message:
            "el parametro table debe ser users/products/categories/providers",
        });
    }

    res.json({
      ok: true,
      data,
    });
  }
}

export const searchController = new SearchController();
