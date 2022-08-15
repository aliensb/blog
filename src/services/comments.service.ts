import { dbConnection } from '@/databases';
import { CreateCommentDto } from '@/dtos/ comments.dto';
import { commentModel } from '@/models/comments.model';
import { postModel } from '@/models/posts.model';
import { ChildComment, Comment } from '@interfaces/commets.interface';
import { createClient } from 'redis';

class CommentService {
  private comments = commentModel;
  private posts = postModel;
  private redisClient = createClient({
    url: dbConnection.redisUrl,
  });

  constructor() {
    this.redisClient.connect();
  }

  public async createComments(comment: CreateCommentDto, postId: string) {
    const { commentId, content } = comment;
    const post = await this.posts.findById(postId);
    if (!post) throw new Error('');
    let createdComment: Comment;
    if (commentId) {
      const parentComment = await this.comments.findById(commentId);
      if (!parentComment) throw new Error('parent commet not exist');
      createdComment = await this.comments.create({
        postId,
        content,
        parentId: commentId,
        depth: parentComment.depth + 1,
      });
    } else {
      createdComment = await this.comments.create({
        postId,
        content,
      });
    }
    this.redisClient.del(`comments:${postId}`);
    return createdComment._id;
  }

  private rec(comment: Comment, threads: ChildComment) {
    for (const thread in threads) {
      const value = threads[thread];

      if (thread.toString() === comment.parentId.toString()) {
        value.children[comment._id] = comment;
        return;
      }

      if (value.children) {
        this.rec(comment, value.children);
      }
    }
  }

  public async getComments(postId: string) {
    const value = await this.redisClient.get(`comments:${postId}`);
    if (value == null) {
      const comments = await commentModel.find({ postId, type: 0 }).lean().sort({ createdAt: 1 });
      const threads: ChildComment = new ChildComment();
      let commet: Comment;
      for (let i = 0; i < comments.length; i++) {
        commet = comments[i];
        commet.children = new ChildComment();
        const parentId = commet.parentId;
        if (!parentId) {
          threads[commet._id] = commet;
          continue;
        }
        this.rec(commet, threads);
      }
      this.redisClient.set(`comments:${postId}`, JSON.stringify(threads));
      return threads;
    } else {
      return JSON.parse(value);
    }
  }
}

export default CommentService;
