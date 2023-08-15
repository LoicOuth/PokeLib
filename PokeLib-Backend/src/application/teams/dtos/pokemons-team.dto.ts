import { PokemonToTeam } from 'src/domain/entities/pivots/pokemons-teams.pivot';

export class PokemonsTeamDto {
  pokemon_id: number;

  constructor(pokemon_id: number) {
    this.pokemon_id = pokemon_id;
  }

  static projection = (pokemonToTeam: PokemonToTeam): PokemonsTeamDto => new this(pokemonToTeam.pokemon_id);

  static listProjection = (pokemonsToTeam: PokemonToTeam[]): PokemonsTeamDto[] =>
    pokemonsToTeam.map((el) => this.projection(el));
}
