import { IsString } from 'class-validator'
export class BoardDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
}
