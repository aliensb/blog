import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @Length(4, 10)
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class UserLoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
