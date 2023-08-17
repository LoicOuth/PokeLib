import { Ability } from 'src/domain/entities/ability.entity';
export abstract class IAbilityRepository {
  abstract createOrUpdateFromPokeapi(name: string): Promise<Ability>;
  abstract getRandomlyFromPokemon(pokemonId: number): Promise<Ability>;
}
