import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class UsersService {
   constructor(@InjectModel(User.name) private userModel:Model<User>){}
  async create(createUserDto: CreateUserDto) {
    const exsisitingUser = await this.userModel.findOne({email:createUserDto.email})
    if(exsisitingUser) throw new BadRequestException()

      const createNewUser = await this.userModel.create(createUserDto)

    return createNewUser
  }

 async findAll() {
    return this.userModel.find()
  }

 async findOne(id: string) {
  if(!isValidObjectId(id)) throw new BadRequestException()

    const findUserByID = await this.userModel.findById(id)

    if(!findUserByID) throw new BadRequestException()

    return findUserByID
  }

 async update(id: string, updateUserDto: UpdateUserDto) {
  if(!isValidObjectId(id)) throw new BadRequestException()
    const updateUserById = await this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true})
  if(!updateUserById) throw new BadRequestException()
    return  updateUserById
  }

 async remove(id: string) {
  if(!isValidObjectId(id)) throw new BadRequestException()

    const findUserAndDeleteById = await this.userModel.findByIdAndDelete(id)

    if(!findUserAndDeleteById) throw new BadRequestException()

    return findUserAndDeleteById
  }
}