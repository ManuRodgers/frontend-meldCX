import { IsString, IsEmail } from 'class-validator';

export class NotifyDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  repoUrl!: string;

  @IsString()
  message!: string;
}
