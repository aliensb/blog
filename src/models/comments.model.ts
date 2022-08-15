import { model, Schema, Document } from 'mongoose';
import { Comment } from '@/interfaces/commets.interface';
const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, required: true },
    depth: { type: Number, default: 1 },
    parentId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true },
);

export const commentModel = model<Comment & Document>('Comment', commentSchema);
