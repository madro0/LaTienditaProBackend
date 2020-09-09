import userModel from "../models/userModel";
import productModel from "../models/productModel";
import fs from "fs";
import { collect } from "underscore";
class UpdateImage {
  constructor() {}

  public async updateImages(tipo: string, id: string, imgName: string) {
    switch (tipo) {
      case "user":
        try {
          let user: any = await userModel.findById(id);
          const oldImgUserPath = `./src/server/uploads/user/${user.img}`;

          //revisar si la el path de la imagen existe y si es asi eliminarla
          await this.deletedDuplicate(oldImgUserPath);

          user.img = imgName;

          await user.save();
          return true;
        } catch (err) {
          return false;
        }
        break;

      case "product":
        try {
          let product: any = await productModel.findById(id);

          const oldImgProductPath = `./src/server/uploads/product/${product.img}`;

          //revisar si la el path de la imagen existe y si es asi eliminarla
          await this.deletedDuplicate(oldImgProductPath);

          product.img = imgName;

          await product.save();
          return true;
        } catch (err) {
          return false;
        }
    }
    return false;
  }

  public async deletedDuplicate(imgPath: string) {
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  }
}

export const updateImage = new UpdateImage();
