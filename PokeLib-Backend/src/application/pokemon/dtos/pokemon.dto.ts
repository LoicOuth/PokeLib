import { Pokemon } from 'src/domain/entities/pokemon.entity';
import { EvolutionDto } from './evolution.dto';

export class PokemonDto {
  id: number;
  pokedex_order: number;
  name: string;
  description: string;
  height: string;
  weight: string;
  generation: number;
  sprite_regular: string;
  sprite_shiny?: string;
  sprite_gmax?: string;
  hp: number;
  atk: number;
  def: number;
  spe_atk: number;
  spe_def: number;
  vit: number;
  first_type_id: number;
  second_type_id?: number;
  evolutions: EvolutionDto[];

  constructor(params: Partial<PokemonDto>) {
    Object.assign(this, params);
  }

  static projection = (pokemon: Pokemon): PokemonDto =>
    new this({
      id: pokemon.id,
      pokedex_order: pokemon.pokedex_order,
      name: pokemon.name,
      description: pokemon.description,
      height: pokemon.height,
      weight: pokemon.weight,
      generation: pokemon.generation,
      sprite_regular: pokemon.sprite_regular,
      sprite_shiny: pokemon.sprite_shiny,
      sprite_gmax: pokemon.sprite_gmax,
      hp: pokemon.hp,
      atk: pokemon.atk,
      def: pokemon.def,
      spe_atk: pokemon.spe_atk,
      spe_def: pokemon.spe_def,
      vit: pokemon.vit,
      first_type_id: pokemon.first_type_id,
      second_type_id: pokemon.second_type_id,
      evolutions: pokemon.evolutions ? EvolutionDto.listProjection(pokemon.evolutions) : [],
    });

  static miniProjection = (pokemon: Pokemon) =>
    new this({
      id: pokemon.id,
      name: pokemon.name,
      sprite_regular: pokemon.sprite_regular,
    });

  static listProjection = (pokemons: Pokemon[]): PokemonDto[] => pokemons.map((el) => this.projection(el));
}
