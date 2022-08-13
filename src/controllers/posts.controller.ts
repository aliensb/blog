import { CreatePostDto as CreatePostDto, UpdatePostDto } from '@/dtos/posts.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { Post } from '@/interfaces/post.interface';
import PostService from '@/services/posts.service';
import { NextFunction, Request, Response } from 'express';

class PostController {
  private postService = new PostService();
  public createPost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const post: CreatePostDto = req.body;
      const createdPost = await this.postService.createPost(post, req.user._id);
      res.status(201).json({ data: createdPost, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public editePost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const post: UpdatePostDto = req.body;
      const postId = await this.postService.updatePost(post);
      res.status(201).json({ data: postId });
    } catch (error) {
      next(error);
    }
  };

  public getPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post: Post = await this.postService.getPost(req.params.postId);
      res.status(201).json({ data: post });
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
