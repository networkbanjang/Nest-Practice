import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { getUser } from './customDeco/getUser';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 200,
    description: '성공!',
    type: UserDTO,
  })
  @Post('')
  createUser(@Body() userDTO: UserDTO) {
    return this.authService.createUser(userDTO);
  }

  @Post('/login')
  login(@Body() userDTO: UserDTO): Promise<{ accessToken: string }> {
    return this.authService.userLogin(userDTO);
  }
}
