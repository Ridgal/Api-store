import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/_core/decorators/auth.decorator';
import { CurrentUser } from 'src/_core/decorators/user.decorator';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('main')
  @Auth()
  async getMainStatistics(@CurrentUser('id') id: number) {
    return this.statisticsService.getMain(id)
  };
};
