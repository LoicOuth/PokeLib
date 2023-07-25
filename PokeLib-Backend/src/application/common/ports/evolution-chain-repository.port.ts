import { EvolutionChain } from 'src/domain/entities/evolution-chain.entity';
import { IEvolutionChainDetail } from '../interfaces/pokeapi/pokemon.interface';

export abstract class IEvolutionChainRepository {
  abstract createFromPokeapi(evolutionChain: IEvolutionChainDetail): Promise<void>;
  abstract getFromPokeapiId(pokeapiId: bigint): Promise<EvolutionChain>;
}
