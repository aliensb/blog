import { CreatePostDto, UpdatePostDto } from '@/dtos/posts.dto';
import { esConnection, INDEX_NAME } from '@/es';
import { HttpException } from '@/exceptions/HttpException';
import { Post } from '@/interfaces/post.interface';
import { postModel } from '@/models/posts.model';
import { isEmpty } from '@/utils/util';

import { Client } from '@elastic/elasticsearch';

class PostService {
  private posts = postModel;
  private esClient = new Client(esConnection);

  public async createPost(postData: CreatePostDto, userId: string): Promise<string> {
    if (isEmpty(postData)) throw new HttpException(400, 'postData is empty');
    const createdPost = await this.posts.create({ ...postData, author: userId });
    const { _id, ...document } = createdPost;
    await this.esClient.index({
      index: INDEX_NAME,
      id: _id,
      document: document,
    });
    return createdPost._id;
  }

  public async updatePost(postData: UpdatePostDto) {
    const post = await this.posts.findById(postData.postId);
    if (isEmpty(post)) throw new HttpException(400, 'post not exist');
    post.title = postData.title;
    post.content = postData.content;
    post.save();
    const { _id, ...document } = post;
    await this.esClient.update({
      index: INDEX_NAME,
      id: _id,
      doc: document,
    });
    return post._id;
  }

  public async getPost(postId: string): Promise<Post> {
    const post = await (await this.posts.findById(postId)).populate('author', { name: 1 });
    return post;
  }
}

export default PostService;
