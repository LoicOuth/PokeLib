-- CreateTable
CREATE TABLE `User` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `pseudo` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `google_uuid` VARCHAR(191) NULL,
    `registered_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_pseudo_key`(`pseudo`),
    UNIQUE INDEX `User_google_uuid_key`(`google_uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `is_public` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Region` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `poke_api_id` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `display_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Region_poke_api_id_key`(`poke_api_id`),
    UNIQUE INDEX `Region_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `poke_api_id` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `display_name` VARCHAR(191) NOT NULL,
    `region_id` BIGINT NULL,

    UNIQUE INDEX `Location_poke_api_id_key`(`poke_api_id`),
    UNIQUE INDEX `Location_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LocationArea` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `poke_api_id` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `display_name` VARCHAR(191) NOT NULL,
    `location_id` BIGINT NOT NULL,

    UNIQUE INDEX `LocationArea_poke_api_id_key`(`poke_api_id`),
    UNIQUE INDEX `LocationArea_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Generation` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `poke_api_id` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `display_name` VARCHAR(191) NOT NULL,
    `region_id` BIGINT NOT NULL,

    UNIQUE INDEX `Generation_poke_api_id_key`(`poke_api_id`),
    UNIQUE INDEX `Generation_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VersionGroup` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `poke_api_id` BIGINT NOT NULL,
    `generation_id` BIGINT NOT NULL,

    UNIQUE INDEX `VersionGroup_name_key`(`name`),
    UNIQUE INDEX `VersionGroup_poke_api_id_key`(`poke_api_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Version` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `poke_api_id` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `display_name` VARCHAR(191) NOT NULL,
    `version_group_id` BIGINT NOT NULL,

    UNIQUE INDEX `Version_poke_api_id_key`(`poke_api_id`),
    UNIQUE INDEX `Version_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `poke_api_id` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `display_name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Type_poke_api_id_key`(`poke_api_id`),
    UNIQUE INDEX `Type_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Move` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `poke_api_id` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `display_name` VARCHAR(191) NOT NULL,
    `accuracy` INTEGER NULL,
    `power` INTEGER NULL,
    `pp` INTEGER NULL,
    `priority` INTEGER NULL,
    `damage_class` VARCHAR(191) NOT NULL,
    `damage_description` VARCHAR(191) NOT NULL,
    `type_id` BIGINT NOT NULL,

    UNIQUE INDEX `Move_poke_api_id_key`(`poke_api_id`),
    UNIQUE INDEX `Move_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ability` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `poke_api_id` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `display_name` VARCHAR(191) NOT NULL,
    `effect_entries` TEXT NOT NULL,

    UNIQUE INDEX `Ability_poke_api_id_key`(`poke_api_id`),
    UNIQUE INDEX `Ability_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EvolutionChain` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `poke_api_id` BIGINT NOT NULL,

    UNIQUE INDEX `EvolutionChain_poke_api_id_key`(`poke_api_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EvolutionTrigger` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `poke_api_id` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `display_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EvolutionTrigger_poke_api_id_key`(`poke_api_id`),
    UNIQUE INDEX `EvolutionTrigger_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stat` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `poke_api_id` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `display_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Stat_poke_api_id_key`(`poke_api_id`),
    UNIQUE INDEX `Stat_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pokemon` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `poke_api_id` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `display_name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `is_default` BOOLEAN NOT NULL DEFAULT false,
    `base_experience` INTEGER NULL,
    `height` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `pokedex_order` INTEGER NOT NULL,
    `is_legendary` BOOLEAN NOT NULL DEFAULT false,
    `is_mythical` BOOLEAN NOT NULL DEFAULT false,
    `has_gender_difference` BOOLEAN NOT NULL DEFAULT false,
    `atwork` VARCHAR(191) NULL,
    `atwork_shiny` VARCHAR(191) NULL,
    `sprite_back_default` VARCHAR(191) NULL,
    `sprite_back_default_shiny` VARCHAR(191) NULL,
    `sprite_back_female` VARCHAR(191) NULL,
    `sprite_back_female_shiny` VARCHAR(191) NULL,
    `sprite_front_default` VARCHAR(191) NULL,
    `sprite_front_default_shiny` VARCHAR(191) NULL,
    `sprite_front_female` VARCHAR(191) NULL,
    `sprite_front_female_shiny` VARCHAR(191) NULL,
    `first_type_id` BIGINT NOT NULL,
    `second_type_id` BIGINT NULL,
    `evolution_chain_id` BIGINT NULL,

    UNIQUE INDEX `Pokemon_poke_api_id_key`(`poke_api_id`),
    UNIQUE INDEX `Pokemon_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemons_stats` (
    `base_stat` INTEGER NOT NULL,
    `pokemon_id` BIGINT NOT NULL,
    `stat_id` BIGINT NOT NULL,

    PRIMARY KEY (`pokemon_id`, `stat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemons_past_types` (
    `pokemon_id` BIGINT NOT NULL,
    `type_id` BIGINT NOT NULL,
    `generation_id` BIGINT NOT NULL,

    PRIMARY KEY (`pokemon_id`, `type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evolutions_chain_pokemons` (
    `evolution_chain_id` BIGINT NOT NULL,
    `evolution_trigger_id` BIGINT NOT NULL,
    `pokemon_from_id` BIGINT NOT NULL,
    `pokemon_to_id` BIGINT NOT NULL,

    PRIMARY KEY (`evolution_trigger_id`, `evolution_chain_id`, `pokemon_from_id`, `pokemon_to_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemons_teams` (
    `pokemon_id` BIGINT NOT NULL,
    `team_id` BIGINT NOT NULL,
    `ability_id` BIGINT NOT NULL,
    `move_1_id` BIGINT NOT NULL,
    `move_2_id` BIGINT NOT NULL,
    `move_3_id` BIGINT NOT NULL,
    `move_4_id` BIGINT NOT NULL,

    PRIMARY KEY (`pokemon_id`, `team_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LocationAreaToPokemon` (
    `A` BIGINT NOT NULL,
    `B` BIGINT NOT NULL,

    UNIQUE INDEX `_LocationAreaToPokemon_AB_unique`(`A`, `B`),
    INDEX `_LocationAreaToPokemon_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MoveToPokemon` (
    `A` BIGINT NOT NULL,
    `B` BIGINT NOT NULL,

    UNIQUE INDEX `_MoveToPokemon_AB_unique`(`A`, `B`),
    INDEX `_MoveToPokemon_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AbilityToPokemon` (
    `A` BIGINT NOT NULL,
    `B` BIGINT NOT NULL,

    UNIQUE INDEX `_AbilityToPokemon_AB_unique`(`A`, `B`),
    INDEX `_AbilityToPokemon_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PokemonToVersion` (
    `A` BIGINT NOT NULL,
    `B` BIGINT NOT NULL,

    UNIQUE INDEX `_PokemonToVersion_AB_unique`(`A`, `B`),
    INDEX `_PokemonToVersion_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `Region`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LocationArea` ADD CONSTRAINT `LocationArea_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Generation` ADD CONSTRAINT `Generation_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `Region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VersionGroup` ADD CONSTRAINT `VersionGroup_generation_id_fkey` FOREIGN KEY (`generation_id`) REFERENCES `Generation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Version` ADD CONSTRAINT `Version_version_group_id_fkey` FOREIGN KEY (`version_group_id`) REFERENCES `VersionGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Move` ADD CONSTRAINT `Move_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pokemon` ADD CONSTRAINT `Pokemon_first_type_id_fkey` FOREIGN KEY (`first_type_id`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pokemon` ADD CONSTRAINT `Pokemon_second_type_id_fkey` FOREIGN KEY (`second_type_id`) REFERENCES `Type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pokemon` ADD CONSTRAINT `Pokemon_evolution_chain_id_fkey` FOREIGN KEY (`evolution_chain_id`) REFERENCES `EvolutionChain`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemons_stats` ADD CONSTRAINT `pokemons_stats_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemons_stats` ADD CONSTRAINT `pokemons_stats_stat_id_fkey` FOREIGN KEY (`stat_id`) REFERENCES `Stat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemons_past_types` ADD CONSTRAINT `pokemons_past_types_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemons_past_types` ADD CONSTRAINT `pokemons_past_types_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemons_past_types` ADD CONSTRAINT `pokemons_past_types_generation_id_fkey` FOREIGN KEY (`generation_id`) REFERENCES `Generation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evolutions_chain_pokemons` ADD CONSTRAINT `evolutions_chain_pokemons_evolution_chain_id_fkey` FOREIGN KEY (`evolution_chain_id`) REFERENCES `EvolutionChain`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evolutions_chain_pokemons` ADD CONSTRAINT `evolutions_chain_pokemons_evolution_trigger_id_fkey` FOREIGN KEY (`evolution_trigger_id`) REFERENCES `EvolutionTrigger`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evolutions_chain_pokemons` ADD CONSTRAINT `evolutions_chain_pokemons_pokemon_from_id_fkey` FOREIGN KEY (`pokemon_from_id`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evolutions_chain_pokemons` ADD CONSTRAINT `evolutions_chain_pokemons_pokemon_to_id_fkey` FOREIGN KEY (`pokemon_to_id`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemons_teams` ADD CONSTRAINT `pokemons_teams_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemons_teams` ADD CONSTRAINT `pokemons_teams_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemons_teams` ADD CONSTRAINT `pokemons_teams_ability_id_fkey` FOREIGN KEY (`ability_id`) REFERENCES `Ability`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemons_teams` ADD CONSTRAINT `pokemons_teams_move_1_id_fkey` FOREIGN KEY (`move_1_id`) REFERENCES `Move`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemons_teams` ADD CONSTRAINT `pokemons_teams_move_2_id_fkey` FOREIGN KEY (`move_2_id`) REFERENCES `Move`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemons_teams` ADD CONSTRAINT `pokemons_teams_move_3_id_fkey` FOREIGN KEY (`move_3_id`) REFERENCES `Move`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemons_teams` ADD CONSTRAINT `pokemons_teams_move_4_id_fkey` FOREIGN KEY (`move_4_id`) REFERENCES `Move`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LocationAreaToPokemon` ADD CONSTRAINT `_LocationAreaToPokemon_A_fkey` FOREIGN KEY (`A`) REFERENCES `LocationArea`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LocationAreaToPokemon` ADD CONSTRAINT `_LocationAreaToPokemon_B_fkey` FOREIGN KEY (`B`) REFERENCES `Pokemon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MoveToPokemon` ADD CONSTRAINT `_MoveToPokemon_A_fkey` FOREIGN KEY (`A`) REFERENCES `Move`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MoveToPokemon` ADD CONSTRAINT `_MoveToPokemon_B_fkey` FOREIGN KEY (`B`) REFERENCES `Pokemon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AbilityToPokemon` ADD CONSTRAINT `_AbilityToPokemon_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ability`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AbilityToPokemon` ADD CONSTRAINT `_AbilityToPokemon_B_fkey` FOREIGN KEY (`B`) REFERENCES `Pokemon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PokemonToVersion` ADD CONSTRAINT `_PokemonToVersion_A_fkey` FOREIGN KEY (`A`) REFERENCES `Pokemon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PokemonToVersion` ADD CONSTRAINT `_PokemonToVersion_B_fkey` FOREIGN KEY (`B`) REFERENCES `Version`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
