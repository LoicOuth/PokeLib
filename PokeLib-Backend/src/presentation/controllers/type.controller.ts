import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { GetAllTypeQuery } from 'src/application/type/queries/get-all-type.query';

@ApiTags('Type')
@Controller('types')
export class TypeController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getAll() {
    return await this.queryBus.execute(new GetAllTypeQuery());
  }
}
