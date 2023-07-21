import { Injectable } from '@nestjs/common';
import { IAbilityRepository } from 'src/application/common/ports/ability-repository.port';
import { PrismaService } from '../adapter/prisma.service';
import { IPokeapiAbility } from '../../application/common/interfaces/pokeapi/ability.interface';
import { getNameInEnglish } from '../pokeapi/pokeapi.constants';

@Injectable()
export class AbilityRepository implements IAbilityRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  createOrUpdateFromPokeapi = async (ability: IPokeapiAbility): Promise<void> => {
    const entries = ability.effect_entries.find((el) => el.language.name == 'en');

    const data = {
      name: ability.name,
      display_name: getNameInEnglish(ability),
      effect_entries: entries ? entries.effect : '',
    };

    await this.prismaClient.ability.upsert({
      where: {
        poke_api_id: ability.id,
      },
      update: data,
      create: {
        poke_api_id: ability.id,
        ...data,
      },
    });
  };
}
