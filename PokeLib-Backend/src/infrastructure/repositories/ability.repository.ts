import { Injectable } from '@nestjs/common';
import { IAbilityRepository } from 'src/application/common/ports/ability-repository.port';
import { PrismaService } from '../adapter/prisma.service';
import { Ability } from 'src/domain/entities/ability.entity';

@Injectable()
export class AbilityRepository implements IAbilityRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  createOrUpdateFromPokeapi = async (name: string): Promise<Ability> => {
    const data = {
      name,
    };

    return await this.prismaClient.ability.upsert({
      where: data,
      update: data,
      create: data,
    });
  };

  getRandomlyFromPokemon = async (pokemonId: number): Promise<Ability> => {
    const abilities = await this.prismaClient.ability.findMany({
      where: { pokemons: { some: { pokemon_id: pokemonId } } },
    });

    return abilities[Math.floor(Math.random() * abilities.length)];
  };
}
