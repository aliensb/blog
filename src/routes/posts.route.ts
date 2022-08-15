import PostController from '@/controllers/posts.controller';
import { CreatePostDto, PagePostDto, UpdatePostDto } from '@/dtos/posts.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class PostRoute implements Routes {
  public path = '/posts';
  public router = Router();
  public postController = new PostController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreatePostDto, 'body'), this.postController.createPost);
    this.router.put(`${this.path}`, authMiddleware, validationMiddleware(UpdatePostDto, 'body'), this.postController.editePost);
    this.router.get(`${this.path}/:postId`, this.postController.getPost);
    this.router.post(`${this.path}/page`, validationMiddleware(PagePostDto, 'body'), this.postController.pagePost);
  }
}

export default PostRoute;
