import { InjectRepository } from '@nestjs/typeorm';
import Deals from 'src/Entities/Deals';

import { Repository } from 'typeorm';

export class DealsService {
  constructor(
    @InjectRepository(Deals)
    private dealsRepository: Repository<Deals>,
  ) {}

  async getDeals() {
    const deals = await this.dealsRepository.find();
    return deals;
  }
}
