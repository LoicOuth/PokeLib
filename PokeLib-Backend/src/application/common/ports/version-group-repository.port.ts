import { IPokeapiVersionGroup } from '../interfaces/pokeapi/version-group.interface';
import { VersionGroup } from 'src/domain/entities/version-group.entity';

export abstract class IVersionGroupRepository {
  abstract createOrUpdateFromPokeapi(verionGroup: IPokeapiVersionGroup): Promise<void>;
  abstract getFromName(name: string): Promise<VersionGroup>;
}
