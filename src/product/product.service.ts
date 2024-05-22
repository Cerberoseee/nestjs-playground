import { Injectable } from '@nestjs/common';
import { ProductInterface } from './interfaces/product.interface';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ProductDto } from './dto/product.dto';
import { BadRequestException } from 'src/exception/bad-request.exception';
import { NotFoundException } from 'src/exception/not-found.exception';
import { ProductPatchDto } from './dto/product_update.dto';

@Injectable()
export class ProductService {
  private productList: ProductInterface[] = [];

  async fetch(): Promise<ProductInterface[]> {
    return this.productList;
  }

  async fetchDetail(id: string): Promise<ProductInterface> {
    const product = this.productList.find((e) => e.id === id);
    if (!product) throw new NotFoundException();
    return product;
  }

  async uploadImage(file: Express.Multer.File, id: string): Promise<string> {
    try {
      const fileName = id + '.' + file.originalname.split('.').pop();
      fs.writeFileSync('public/' + fileName, file.buffer);
      return process.env.HOSTNAME + '/' + fileName;
    } catch (err) {
      throw new BadRequestException('Error Uploading Image: ' + err);
    }
  }

  async deleteImage(fileLink: string): Promise<void> {
    try {
      const fileName = fileLink.split('/').pop();
      fs.unlinkSync('public/' + fileName);
    } catch (err) {
      throw new BadRequestException('Error Deleting Image: ' + err);
    }
  }

  async addProduct(
    product: ProductDto,
    file: Express.Multer.File,
  ): Promise<ProductInterface> {
    const id = uuidv4();
    try {
      const result = await this.uploadImage(file, id);
      const prod: ProductInterface = {
        ...product,
        id: id,
        product_image_url: result,
      };
      this.productList.push(prod);
      return prod;
    } catch (err) {
      throw new BadRequestException('Error Adding Product: ' + err);
    }
  }

  async deleteProduct(id: string): Promise<ProductInterface> {
    const deleteProduct = this.productList.find((e) => e.id === id);
    if (!deleteProduct) throw new NotFoundException();
    this.productList = this.productList.filter((e) => e.id !== id);
    return deleteProduct;
  }

  async patchProduct(
    id: string,
    product: ProductPatchDto,
    file?: Express.Multer.File,
  ): Promise<ProductInterface> {
    const index = this.productList.findIndex((e) => e.id === id);
    if (index == -1) throw new NotFoundException();
    let imagePath: string = null;
    if (file != null) {
      await this.deleteImage(this.productList[index].product_image_url);
      imagePath = await this.uploadImage(file, id);
    }
    this.productList[index] = {
      ...this.productList[index],
      product_name:
        product.product_name || this.productList[index].product_name,
      price: product.price || this.productList[index].price,
      description: product.description || this.productList[index].description,
      product_image_url: imagePath || this.productList[index].product_image_url,
    };

    return this.productList[index];
  }
}
