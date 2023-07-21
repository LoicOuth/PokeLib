import { IPokeapiAbility } from '../interfaces/pokeapi/ability.interface';

export abstract class IAbilityRepository {
  abstract createOrUpdateFromPokeapi(ability: IPokeapiAbility): Promise<void>;
}
