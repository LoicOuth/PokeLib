import { IPokeapiBaseEntity } from './common/base-entity.interface';

export interface IPokeapiGeneration extends IPokeapiBaseEntity {
  main_region: {
    name: string;
  };
}
