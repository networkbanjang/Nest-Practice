import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('')
  createUser(@Body() userDTO: UserDTO) {
    return this.authService.createUser(userDTO);
  }

  @Post('/login')
  login(@Body() userDTO: UserDTO): Promise<{ accessToken: string }> {
    return this.authService.userLogin(userDTO);
  }
}
