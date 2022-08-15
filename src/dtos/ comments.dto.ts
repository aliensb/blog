import { IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  public content: string;

  @IsOptional()
  public commentId?: string;
}
