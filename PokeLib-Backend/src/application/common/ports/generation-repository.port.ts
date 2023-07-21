import { IPokeapiGeneration } from '../interfaces/pokeapi/generation.interface';
import { Generation } from 'src/domain/entities/generation.entity';

export abstract class IGenerationRepository {
  abstract createOrUpdateFromPokeapi(generation: IPokeapiGeneration): Promise<void>;
  abstract getFromName(name: string): Promise<Generation>;
}
