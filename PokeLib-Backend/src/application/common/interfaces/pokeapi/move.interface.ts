import { IPokeapiBaseEntity } from './common/base-entity.interface';

export interface IPokeapiMove extends IPokeapiBaseEntity {
  accuracy: number;
  pp: number;
  priority: number;
  power: number;
  type: {
    name: string;
  };
  damage_class: {
    name: string;
  };
}
