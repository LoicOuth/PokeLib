import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TypeDto } from '../dtos/type.dto';
import { ITypeRepository } from 'src/application/common/ports/type-repository.port';

export class GetAllTypeQuery {}

@QueryHandler(GetAllTypeQuery)
export class GetAllTypeQueryHandler implements IQueryHandler<GetAllTypeQuery, TypeDto[]> {
  constructor(private readonly typeRepo: ITypeRepository) {}

  async execute(): Promise<TypeDto[]> {
    const list = await this.typeRepo.getAll();

    return TypeDto.listProjection(list);
  }
}
