import { IPokeapiBaseEntity } from './common/base-entity.interface';

export interface IPokeapiVersionGroup extends IPokeapiBaseEntity {
  generation: {
    name: string;
  };
}
