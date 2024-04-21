import { InjectRepository } from '@nestjs/typeorm';
import { Deal } from 'src/Entities/deals';

import { Repository } from 'typeorm';

export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private dealsRepository: Repository<Deal>,
  ) {}

  async getDeals() {
    const deals = await this.dealsRepository.find();
    return deals;
  }
}
