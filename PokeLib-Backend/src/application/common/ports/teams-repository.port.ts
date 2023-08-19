import { Team } from 'src/domain/entities/team.entity';
import { IPagination } from '../interfaces/pagination.interface';

export abstract class ITeamsRepository {
  abstract getOne(teamId: number): Promise<Team>;
  abstract getPaginated(page: number, take: number): Promise<IPagination<Team>>;
  abstract getPaginatedFromUserId(page: number, take: number, userId: number): Promise<IPagination<Team>>;
  abstract create(userId: number): Promise<Team>;
  abstract updateName(teamId: number, name: string): Promise<void>;
  abstract addPokemon(teamId: number, pokemonId: number, abilityId: number): Promise<void>;
  abstract deletePokemon(teamId: number, pokemonId: number): Promise<void>;
  abstract switchPokemon(teamId: number, oldPokemonId: number, pokemonId: number, abilityId: number): Promise<void>;
  abstract delete(teamId: number): Promise<void>;
  abstract setPublic(teamId: number, isPublic: boolean): Promise<void>;
}
