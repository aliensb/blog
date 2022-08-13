import { model, Schema, Document } from 'mongoose';
import { Post } from '@/interfaces/post.interface';

const postSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      require: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const postModel = model<Post & Document>('Post', postSchema);
