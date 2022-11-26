import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entity/user.entity';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }), //세션쿠키를 사용cd안하기때문에 false
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: {
        expiresIn: 60 * 60, //유효시간
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
