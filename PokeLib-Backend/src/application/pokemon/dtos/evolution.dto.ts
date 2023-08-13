import { Evolution } from 'src/domain/entities/evolution.entity';
import { PokemonDto } from './pokemon.dto';

export class EvolutionDto {
  id: number;
  condition?: string;
  pokemon_evolution: PokemonDto;

  constructor(id: number, condition: string, pokemon_evolution: PokemonDto) {
    this.id = id;
    this.condition = condition;
    this.pokemon_evolution = pokemon_evolution;
  }

  static projection = (evolution: Evolution): EvolutionDto => {
    return new this(evolution.id, evolution.condition, PokemonDto.miniProjection(evolution.pokemon_evolution));
  };

  static listProjection = (evolutions: Evolution[]): EvolutionDto[] => evolutions.map((el) => this.projection(el));
}
