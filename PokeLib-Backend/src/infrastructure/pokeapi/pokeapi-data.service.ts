import { Injectable } from '@nestjs/common';
import { IPokeapiData } from 'src/application/common/ports/pokeapi-data.port';
import { PokeapiClient } from './pokeapi-client.service';
import { IAbilityRepository } from 'src/application/common/ports/ability-repository.port';
import { IEvolutionTriggerRepository } from 'src/application/common/ports/evolution-trigger.port';
import { IPokeapiBaseEntity } from 'src/application/common/interfaces/pokeapi/common/base-entity.interface';
import { IPokeapiAbility } from 'src/application/common/interfaces/pokeapi/ability.interface';
import { IEvolutionChainRepository } from 'src/application/common/ports/evolution-chain-repository.port';
import { ITypeRepository } from 'src/application/common/ports/type-repository.port';
import { IPokeapiType } from 'src/application/common/interfaces/pokeapi/type.interface';
import { IMoveRepository } from 'src/application/common/ports/move-repository.port';
import { IPokeapiMove } from 'src/application/common/interfaces/pokeapi/move.interface';
import { IStatRepository } from 'src/application/common/ports/stat-repository.port';
import { IRegionRepository } from 'src/application/common/ports/region-repository.port';
import { ILocationRepository } from 'src/application/common/ports/location-repository.port';
import { IPokeapiLocation } from 'src/application/common/interfaces/pokeapi/location.interface';
import { ILocationAreaRepository } from 'src/application/common/ports/location-area-repository.port';
import { IPokeapiLocationArea } from 'src/application/common/interfaces/pokeapi/location-area.interface';
import { IPokeapiGeneration } from 'src/application/common/interfaces/pokeapi/generation.interface';
import { IGenerationRepository } from 'src/application/common/ports/generation-repository.port';
import { IVersionGroupRepository } from 'src/application/common/ports/version-group-repository.port';
import { IPokeapiVersionGroup } from 'src/application/common/interfaces/pokeapi/version-group.interface';
import { IVersionRepository } from 'src/application/common/ports/version-repository.port';
import { IPokeapiVersion } from 'src/application/common/interfaces/pokeapi/version.interface';
import { IPokeapiPokemon } from 'src/application/common/interfaces/pokeapi/pokemon.interface';
import { IPokemonRepository } from 'src/application/common/ports/pokemon-repository.port';

@Injectable()
export class PokeapiData implements IPokeapiData {
  constructor(
    private readonly pokeapiClient: PokeapiClient,
    private readonly AP: IAbilityRepository,
    private readonly ETR: IEvolutionTriggerRepository,
    private readonly ECR: IEvolutionChainRepository,
    private readonly TR: ITypeRepository,
    private readonly MR: IMoveRepository,
    private readonly SR: IStatRepository,
    private readonly RR: IRegionRepository,
    private readonly LR: ILocationRepository,
    private readonly LAR: ILocationAreaRepository,
    private readonly GR: IGenerationRepository,
    private readonly VGR: IVersionGroupRepository,
    private readonly VR: IVersionRepository,
    private readonly PR: IPokemonRepository,
  ) {}

  setDataInDatabase = async (): Promise<void> => {
    await this.execute<IPokeapiAbility>('ability', this.AP.createOrUpdateFromPokeapi);
    await this.execute('evolution-trigger', this.ETR.createOrUpdateFromPokeapi);
    await this.execute('evolution-chain', this.ECR.createFromPokeapi);
    await this.execute<IPokeapiType>('type', this.TR.createOrUpdateFromPokeapi);
    await this.execute<IPokeapiMove>('move', this.MR.createOrUpdateFromPokeapi);
    await this.execute('stat', this.SR.createOrUpdateFromPokeapi);
    await this.execute('region', this.RR.createOrUpdateFromPokeapi);
    await this.execute<IPokeapiLocation>('location', this.LR.createOrUpdateFromPokeapi);
    await this.execute<IPokeapiLocationArea>('location-area', this.LAR.createOrUpdateFromPokeapi);
    await this.execute<IPokeapiGeneration>('generation', this.GR.createOrUpdateFromPokeapi);
    await this.execute<IPokeapiVersionGroup>('version-group', this.VGR.createOrUpdateFromPokeapi);
    await this.execute<IPokeapiVersion>('version', this.VR.createOrUpdateFromPokeapi);
    await this.execute<IPokeapiPokemon>('pokemon', this.PR.createOrUpdateFromPokeapi, true);
  };

  private execute = async <T extends IPokeapiBaseEntity>(
    endpoint: string,
    createOrUpdateFromPokeapi: (data: T) => Promise<void>,
    isPokemon = false,
  ): Promise<void> => {
    const data = await this.pokeapiClient.getList<{ url: string }>(endpoint);

    data.forEach(async (el) => {
      let entity = await this.pokeapiClient.get<T>(el.url);
      if (isPokemon) {
        entity = {
          ...(await this.pokeapiClient.get<T>((entity as unknown as IPokeapiPokemon).species.url)),
          ...entity,
        };
      }

      await createOrUpdateFromPokeapi(entity);
    });
  };
}
