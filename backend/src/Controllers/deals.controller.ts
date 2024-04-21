import { Controller, Get } from '@nestjs/common';
import { DealsService } from 'src/Services/deals.service';

@Controller('deals')
export class DealsController {
  constructor(private dealsService: DealsService) {}

  @Get()
  async getAllDeals() {
    const deals = await this.dealsService.getDeals();
    return deals;
  }
}
