import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger"
export class UserDTO {

  @ApiProperty({
    example: '유저네임',
    description: "userName",
    required:true,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string;
  @ApiProperty({
    example: '1234qwer',
    description: "password",
    required:true,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  //영어랑 숫자만 가능하게 하는 유효성체크
  @Matches(/^[a-zA-Z0-9]*$/,{ //위반됐을때
    message:'password는 영어 또는 숫자만 넣어주세요.'
  })
  password: string;

}
