import { IPokeapiBaseEntity } from '../interfaces/pokeapi/common/base-entity.interface';

export abstract class IEvolutionChainRepository {
  abstract createFromPokeapi(evolutionChain: IPokeapiBaseEntity): Promise<void>;
}
