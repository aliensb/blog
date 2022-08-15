import { IsOptional, IsPositive, IsString, Length, Max } from 'class-validator';

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

export class PagePostDto {
  @IsPositive()
  public pageNum = 1;
  @Max(20)
  public pageSize = 10;
  @IsOptional()
  public keyword?: string;
}
