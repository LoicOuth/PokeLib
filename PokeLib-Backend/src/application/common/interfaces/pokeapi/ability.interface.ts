import { IPokeapiBaseEntity } from './common/base-entity.interface';

export interface IPokeapiAbility extends IPokeapiBaseEntity {
  effect_entries: IEffectEntries[];
  effect_changes: { effect_entries: IEffectEntries[] }[];
}

interface IEffectEntries {
  effect: string;
  language: {
    name: string;
  };
}
