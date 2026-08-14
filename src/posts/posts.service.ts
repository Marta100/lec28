import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schema/post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
constructor(@InjectModel(Post.name) private postsModel: Model<any>) {}
 
  async create(userId: string, createPostDto: CreatePostDto) {
    const newPost = await this.postsModel.create({
      ...createPostDto,
      user: userId,
    });
    return newPost;
  }


  async findAll() {
    return this.postsModel.find().populate('user').exec();
  }

 
  async findOne(id: string) {
    const post = await this.postsModel.findById(id).populate('user').exec();
    if (!post) throw new NotFoundException('პოსტი ვერ მოიძებნა');
    return post;
  }


  async update(id: string, updatePostDto: UpdatePostDto) {
    const updatedPost = await this.postsModel.findByIdAndUpdate(
      id,
      updatePostDto,
      { new: true },
    );
    if (!updatedPost) throw new NotFoundException('პოსტი ვერ მოიძებნა');
    return updatedPost;
  }


  async remove(id: string) {
    const deletedPost = await this.postsModel.findByIdAndDelete(id);
    if (!deletedPost) throw new NotFoundException('პოსტი ვერ მოიძებნა');
    return { message: 'პოსტი წარმატებით წაიშალა' };
  }
}