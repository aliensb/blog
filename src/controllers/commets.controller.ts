import { CreateCommentDto } from '@/dtos/ comments.dto';
import CommentService from '@/services/comments.service';
import { NextFunction, Request, Response } from 'express';

class CommentsController {
  private commetService = new CommentService();

  public createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comment: CreateCommentDto = req.body;
      const id = await this.commetService.createComments(comment, req.params.postId);
      res.status(201).json({ data: id });
    } catch (error) {
      next(error);
    }
  };

  public getComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.postId;
      const commets = await this.commetService.getComments(postId);
      res.status(201).json({ data: commets });
    } catch (error) {
      next(error);
    }
  };
}

export default CommentsController;
