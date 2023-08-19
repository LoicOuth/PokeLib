import { Injectable } from '@nestjs/common';
import { IPagination } from 'src/application/common/interfaces/pagination.interface';
import { ITeamsRepository } from 'src/application/common/ports/teams-repository.port';
import { Team } from 'src/domain/entities/team.entity';
import { PrismaService } from '../adapter/prisma.service';
import { Pagination } from '../pagination';

@Injectable()
export class TeamRepository implements ITeamsRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  getOne = async (teamId: number): Promise<Team> =>
    await this.prismaClient.team.findUnique({
      where: { id: teamId },
      include: {
        pokemons_teams: {
          include: {
            pokemon: true,
          },
        },
      },
    });

  getPaginatedFromUserId = async (page: number, take: number, userId: number): Promise<IPagination<Team>> => {
    const count = await this.countTeams();
    const list = await this.prismaClient.team.findMany({
      where: {
        user_id: userId,
      },
      include: {
        pokemons_teams: true,
      },
      skip: (page - 1) * take,
      take,
    });

    return Pagination.paginated(list, page, take, count);
  };

  getPaginated = async (page: number, take: number): Promise<IPagination<Team>> => {
    const count = await this.countTeams();

    const list = await this.prismaClient.team.findMany({
      where: {
        is_public: true,
      },
      include: {
        pokemons_teams: true,
        user: true,
      },
      skip: (page - 1) * take,
      take,
    });

    return Pagination.paginated(list, page, take, count);
  };

  create = async (userId: number): Promise<Team> =>
    await this.prismaClient.team.create({
      data: {
        name: 'Nouvelle équipe',
        is_public: true,
        user_id: userId,
      },
    });

  updateName = async (teamId: number, name: string): Promise<void> => {
    await this.prismaClient.team.update({ where: { id: teamId }, data: { name } });
  };

  addPokemon = async (teamId: number, pokemonId: number, abilityid: number): Promise<void> => {
    await this.prismaClient.team.update({
      where: { id: teamId },
      data: {
        pokemons_teams: {
          create: {
            pokemon_id: pokemonId,
            ability_id: abilityid,
          },
        },
      },
    });
  };

  deletePokemon = async (teamId: number, pokemonId: number): Promise<void> => {
    await this.prismaClient.pokemonToTeam.delete({
      where: {
        pokemon_id_team_id: {
          pokemon_id: pokemonId,
          team_id: teamId,
        },
      },
    });
  };

  switchPokemon = async (teamId: number, oldPokemonId: number, pokemonId: number, abilityId: number): Promise<void> => {
    await this.prismaClient.pokemonToTeam.update({
      where: {
        pokemon_id_team_id: {
          pokemon_id: oldPokemonId,
          team_id: teamId,
        },
      },
      data: {
        pokemon_id: pokemonId,
        ability_id: abilityId,
      },
    });
  };

  delete = async (teamId: number): Promise<void> => {
    await this.prismaClient.pokemonToTeam.deleteMany({
      where: { team_id: teamId },
    });

    await this.prismaClient.team.delete({ where: { id: teamId } });
  };

  setPublic = async (teamId: number, isPublic: boolean): Promise<void> => {
    await this.prismaClient.team.update({
      where: { id: teamId },
      data: {
        is_public: isPublic,
      },
    });
  };

  private countTeams = async () => await this.prismaClient.team.count();
}
