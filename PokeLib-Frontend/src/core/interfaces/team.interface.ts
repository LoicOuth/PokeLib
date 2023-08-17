import type { IPokemon } from './pokemon.interface';
import type { IUser } from './user.interface';

export interface ITeam {
  id: number;
  name: string;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;

  user?: IUser;
  pokemons_teams?: IPokemonsTeam[];
}

export interface IPokemonsTeam {
  pokemon_id: number;
  pokemon?: IPokemon;
}
