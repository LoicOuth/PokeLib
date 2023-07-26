import { IPokeapiAbility } from '../interfaces/pokeapi/pokemon.interface';

export abstract class IAbilityRepository {
  abstract createOrUpdateFromPokeapi(ability: IPokeapiAbility): Promise<void>;
}
