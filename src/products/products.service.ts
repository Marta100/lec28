import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { User, UserDocument } from '../users/schema/user.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createProductDto: any) {
    const newProduct = await this.productModel.create(createProductDto);

    await this.userModel.findByIdAndUpdate(createProductDto.owner, {
      $push: { products: newProduct._id },
    });

    return newProduct;
  }

  async findAll() {
    return this.productModel.find().populate('owner', 'name email').exec();
  }
}