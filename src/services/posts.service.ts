import { dbConnection } from '@/databases';
import { Page } from '@/dtos/page.dot';
import { CreatePostDto, PagePostDto, UpdatePostDto } from '@/dtos/posts.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Post } from '@/interfaces/post.interface';
import { postModel } from '@/models/posts.model';
import { isEmpty } from '@/utils/util';

import { Client } from '@elastic/elasticsearch';

class PostService {
  private posts = postModel;
  private esClient = new Client({ node: dbConnection.esNode });

  public async createPost(postData: CreatePostDto, userId: string): Promise<string> {
    if (isEmpty(postData)) throw new HttpException(400, 'postData is empty');
    const createdPost = await this.posts.create({ ...postData, author: userId });
    return createdPost._id;
  }

  public async updatePost(postData: UpdatePostDto) {
    const post = await this.posts.findById(postData.postId);
    if (isEmpty(post)) throw new HttpException(400, 'post not exist');
    post.title = postData.title;
    post.content = postData.content;
    post.save();

    return post._id;
  }

  public async pagePost(page: PagePostDto): Promise<Page<Post>> {
    if (page.keyword) {
      const result = await this.esClient.search<Post>({
        index: dbConnection.indexName,
        query: {
          bool: {
            should: [
              {
                match_phrase: {
                  title: page.keyword,
                },
              },
              {
                match_phrase: {
                  content: page.keyword,
                },
              },
            ],
          },
        },
        from: (page.pageNum - 1) * page.pageSize,
        size: page.pageSize,
      });
      const postCount = result.hits.total as number;
      const posts = result.hits.hits.map(ht => ht._source);
      return new Page<Post>(posts, postCount);
    } else {
      const postCount = await this.posts.count();
      const posts = await this.posts
        .find()
        .skip((page.pageNum - 1) * page.pageSize)
        .limit(page.pageSize);
      return new Page<Post>(posts, postCount);
    }
  }

  public async getPost(postId: string): Promise<Post> {
    const post = await (await this.posts.findById(postId)).populate('author', { name: 1 });
    return post;
  }
}

export default PostService;
