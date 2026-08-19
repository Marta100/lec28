import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schema/post.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postsModel:Model<any>,private userService:UsersService){}

 async create(userId:string,createPostDto: CreatePostDto) {
  const user = await this.userService.findOne(userId)
    const newPost = await this.postsModel.create({...createPostDto,user:user._id})
    await this.userService.addPost(user._id,newPost._id)
    return newPost
  }

  findAll() {
    return this.postsModel.find()
  }

  findOne(id: string) {
    return `This action returns a #${id} post`;
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: string) {
    return `This action removes a #${id} post`;
  }
}