import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import User from 'src/Entities/User';
import Deals from 'src/Entities/deals';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DB_URL'),
        entities: [User, Deals],
        synchronize: false,
        logging: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
