import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealsController } from './Controllers/deals.controller';
import { DealsService } from './Services/deals.service';
import { Deal } from './Entities/deals';

@Module({
  imports: [TypeOrmModule.forFeature([Deal])],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
