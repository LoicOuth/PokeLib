import { IPokeapiMove } from '../interfaces/pokeapi/move.interface';

export abstract class IMoveRepository {
  abstract createOrUpdateFromPokeapi(move: IPokeapiMove): Promise<void>;
}
