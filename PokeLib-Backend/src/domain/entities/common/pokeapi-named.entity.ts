import { PokeapiEntity } from './pokeapi.entity';

export abstract class PokeapiNamedEntity extends PokeapiEntity {
  name: string;
  display_name: string;
}
