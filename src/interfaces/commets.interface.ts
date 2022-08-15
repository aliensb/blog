export interface Comment {
  _id: string;
  content: string;
  postId: string;
  parentId: string | null;
  children: ChildComment;
  depth: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ChildComment {
  //index signature property
  [seatNumber: string]: Comment;
}
