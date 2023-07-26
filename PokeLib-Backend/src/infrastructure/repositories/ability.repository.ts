import { Injectable } from '@nestjs/common';
import { IAbilityRepository } from 'src/application/common/ports/ability-repository.port';
import { PrismaService } from '../adapter/prisma.service';
import { IPokeapiAbility } from 'src/application/common/interfaces/pokeapi/pokemon.interface';

@Injectable()
export class AbilityRepository implements IAbilityRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  createOrUpdateFromPokeapi = async (ability: IPokeapiAbility): Promise<void> => {
    console.log('test');
  };
}
