import { IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class CreatePostDto {
  @Length(1, 100)
  public title: string;

  @IsString()
  public content: string;
}

export class UpdatePostDto extends CreatePostDto {
  @IsString()
  public postId: string;
}
