import CommentsController from '@/controllers/commets.controller';
import { CreateCommentDto } from '@/dtos/ comments.dto';

import { Routes } from '@/interfaces/routes.interface';

import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class CommentRoute implements Routes {
  public path = '/posts';
  public router = Router();
  public commentsController = new CommentsController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(`${this.path}/:postId/comments`, validationMiddleware(CreateCommentDto, 'body'), this.commentsController.createComment);

    this.router.get(`${this.path}/:postId/comments`, this.commentsController.getComments);
  }
}

export default CommentRoute;
