import { Injectable } from '@nestjs/common';
import { IPokeapiData } from 'src/application/common/ports/pokeapi-data.port';
import { PokeapiClient } from './pokeapi-client.service';
import { IAbilityRepository } from 'src/application/common/ports/ability-repository.port';
import { IEvolutionTriggerRepository } from 'src/application/common/ports/evolution-trigger.port';
import { IPokeapiBaseEntity } from 'src/application/common/interfaces/pokeapi/common/base-entity.interface';
import { IEvolutionChainRepository } from 'src/application/common/ports/evolution-chain-repository.port';
import { ITypeRepository } from 'src/application/common/ports/type-repository.port';
import { IMoveRepository } from 'src/application/common/ports/move-repository.port';
import { IStatRepository } from 'src/application/common/ports/stat-repository.port';
import { IRegionRepository } from 'src/application/common/ports/region-repository.port';
import { ILocationRepository } from 'src/application/common/ports/location-repository.port';
import { ILocationAreaRepository } from 'src/application/common/ports/location-area-repository.port';
import { IGenerationRepository } from 'src/application/common/ports/generation-repository.port';
import { IVersionGroupRepository } from 'src/application/common/ports/version-group-repository.port';
import { IVersionRepository } from 'src/application/common/ports/version-repository.port';
import { ILocationAreaEncounters, IPokeapiPokemon } from 'src/application/common/interfaces/pokeapi/pokemon.interface';
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

  private repositoryMap: Record<string, { endpoint: string; repository: (data: any) => Promise<void> }> = {
    ability: { endpoint: 'ability', repository: this.AP.createOrUpdateFromPokeapi },
    type: { endpoint: 'type', repository: this.TR.createOrUpdateFromPokeapi },
    'evolution-trigger': { endpoint: 'evolution-trigger', repository: this.ETR.createOrUpdateFromPokeapi },
    region: { endpoint: 'region', repository: this.RR.createOrUpdateFromPokeapi },
    location: { endpoint: 'location', repository: this.LR.createOrUpdateFromPokeapi },
    move: { endpoint: 'move', repository: this.MR.createOrUpdateFromPokeapi },
    stat: { endpoint: 'stat', repository: this.SR.createOrUpdateFromPokeapi },
    generation: { endpoint: 'generation', repository: this.GR.createOrUpdateFromPokeapi },
    'version-group': { endpoint: 'version-group', repository: this.VGR.createOrUpdateFromPokeapi },
    'location-area': { endpoint: 'location-area', repository: this.LAR.createOrUpdateFromPokeapi },
    version: { endpoint: 'version', repository: this.VR.createOrUpdateFromPokeapi },
    pokemon: { endpoint: 'pokemon', repository: this.PR.createOrUpdateFromPokeapi },
    'evolution-chain': { endpoint: 'evolution-chain', repository: this.ECR.createFromPokeapi },
  };

  setDataInDatabase = async (): Promise<void> => {
    for (const key in this.repositoryMap) {
      const { endpoint, repository } = this.repositoryMap[key];
      const isPokemon = key === 'pokemon';

      await this.execute(endpoint, repository, isPokemon);
    }
  };

  private execute = async <T extends IPokeapiBaseEntity>(
    endpoint: string,
    createOrUpdateFromPokeapi: (data: T) => Promise<void>,
    isPokemon = false,
  ): Promise<void> => {
    const data = await this.pokeapiClient.getList<{ url: string }>(endpoint);

    const batchPromises = [];
    const batchSize = 100; // Nombre d'éléments par paquet

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize).map((el) => this.pokeapiClient.get<T>(el.url));
      batchPromises.push(Promise.all(batch));
    }

    // Parcourir chaque paquet et exécuter les appels asynchrones en parallèle
    for (const batchPromise of batchPromises) {
      const batchData: T[] = await batchPromise;
      for (let entity of batchData) {
        if (isPokemon) {
          const species = await this.pokeapiClient.get<T>((entity as unknown as IPokeapiPokemon).species.url);

          entity = {
            location_areas: await this.pokeapiClient.get<ILocationAreaEncounters[]>(
              (entity as unknown as IPokeapiPokemon).location_area_encounters,
            ),
            ...species,
            ...entity,
          };
        }
        await createOrUpdateFromPokeapi(entity);
      }
    }
  };
}
