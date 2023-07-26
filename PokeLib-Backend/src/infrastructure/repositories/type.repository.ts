import { Injectable } from '@nestjs/common';
import { PrismaService } from '../adapter/prisma.service';
import { ITypeRepository } from 'src/application/common/ports/type-repository.port';
import { IPokeapiType } from 'src/application/common/interfaces/pokeapi/type.interface';

@Injectable()
export class TypeRepository implements ITypeRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  createOrUpdateFromPokeapi = async (type: IPokeapiType): Promise<void> => {
    console.log('test');
  };
}
