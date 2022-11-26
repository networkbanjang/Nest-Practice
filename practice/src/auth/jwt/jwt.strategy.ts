import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: process.env.JWTSECRET, //시크릿키가 유효한지 체크
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    //토큰이 유효할시 실행됨
    const { userName } = payload;
    const user: User = await this.userRepository.findOne({
      where: {
        userName,
      },
      select:  ['id','userName'],
      
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
