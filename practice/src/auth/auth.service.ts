import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(userDTO: UserDTO): Promise<void> {
    const { userName, password } = userDTO;
    const salt = await bcrypt.genSalt();
    const hashPW = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      userName,
      password: hashPW,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('유저네임 중복');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async userLogin(userDTO: UserDTO): Promise<{ accessToken: string }> {
    const { userName, password } = userDTO;
    const user = await this.userRepository.findOneBy({ userName });
    if (user && (await bcrypt.compare(password, user.password))) {
      //유저 토큰 생성 (Secret + Payload)
      const payload = { userName }; //payload에는 중요한 정보를 넣지 않는다.
      const accessToken = await this.jwtService.sign(payload); //알아서 시크릿과 pay로드를 합쳐서 accessToken을 생성해줌
      return { accessToken }; 
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
