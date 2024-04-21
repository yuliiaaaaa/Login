import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import User from './Entities/User';
import { AuthService } from './Services/auth.service';
import { AuthController } from './Controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersService } from './Services/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('SECRET__KEY'),
        signOptions: {
          expiresIn: config.get<string | number>('JWT_EXPIRES'),
        },
      }),
    }),
    TypeOrmModule.forFeature([User]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAILER_HOST'),
          port: configService.get<number>('MAILER_PORT'),
          secure: configService.get<boolean>('MAILER_SECURE'),
          auth: {
            user: configService.get<string>('MAILER_USER'),
            pass: configService.get<string>('MAILER_PASS'),
          },
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
