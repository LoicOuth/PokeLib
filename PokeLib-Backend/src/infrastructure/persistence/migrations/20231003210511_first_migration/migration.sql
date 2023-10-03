-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `pseudo` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `pseudo_is_edited` BOOLEAN NOT NULL DEFAULT false,
    `google_uuid` VARCHAR(191) NULL,
    `registered_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_pseudo_key`(`pseudo`),
    UNIQUE INDEX `User_google_uuid_key`(`google_uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `is_public` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `poke_api_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `sprite` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Type_poke_api_id_key`(`poke_api_id`),
    UNIQUE INDEX `Type_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Ability_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evolution` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `condition` VARCHAR(191) NULL,
    `pokemon_id` INTEGER NOT NULL,
    `pokemon_evolution_id` INTEGER NOT NULL,
    `type` ENUM('PRE', 'NEXT') NOT NULL DEFAULT 'PRE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MegaEvolution` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orbe` VARCHAR(191) NOT NULL,
    `sprite_regular` VARCHAR(191) NOT NULL,
    `sprite_shiny` VARCHAR(191) NOT NULL,
    `pokemon_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pokemon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pokedex_order` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `height` VARCHAR(191) NOT NULL,
    `weight` VARCHAR(191) NOT NULL,
    `generation` INTEGER NOT NULL,
    `sprite_regular` VARCHAR(191) NOT NULL,
    `sprite_shiny` VARCHAR(191) NULL,
    `sprite_gmax` VARCHAR(191) NULL,
    `hp` INTEGER NOT NULL,
    `atk` INTEGER NOT NULL,
    `def` INTEGER NOT NULL,
    `spe_atk` INTEGER NOT NULL,
    `spe_def` INTEGER NOT NULL,
    `vit` INTEGER NOT NULL,
    `first_type_id` INTEGER NOT NULL,
    `second_type_id` INTEGER NULL,

    UNIQUE INDEX `Pokemon_pokedex_order_key`(`pokedex_order`),
    UNIQUE INDEX `Pokemon_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PokemonToTeam` (
    `ability_id` INTEGER NOT NULL,
    `pokemon_id` INTEGER NOT NULL,
    `team_id` INTEGER NOT NULL,

    PRIMARY KEY (`pokemon_id`, `team_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AbilityToPokemon` (
    `is_hidden` BOOLEAN NOT NULL,
    `ability_id` INTEGER NOT NULL,
    `pokemon_id` INTEGER NOT NULL,

    PRIMARY KEY (`pokemon_id`, `ability_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evolution` ADD CONSTRAINT `Evolution_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evolution` ADD CONSTRAINT `Evolution_pokemon_evolution_id_fkey` FOREIGN KEY (`pokemon_evolution_id`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MegaEvolution` ADD CONSTRAINT `MegaEvolution_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pokemon` ADD CONSTRAINT `Pokemon_first_type_id_fkey` FOREIGN KEY (`first_type_id`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pokemon` ADD CONSTRAINT `Pokemon_second_type_id_fkey` FOREIGN KEY (`second_type_id`) REFERENCES `Type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokemonToTeam` ADD CONSTRAINT `PokemonToTeam_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokemonToTeam` ADD CONSTRAINT `PokemonToTeam_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokemonToTeam` ADD CONSTRAINT `PokemonToTeam_ability_id_fkey` FOREIGN KEY (`ability_id`) REFERENCES `Ability`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AbilityToPokemon` ADD CONSTRAINT `AbilityToPokemon_ability_id_fkey` FOREIGN KEY (`ability_id`) REFERENCES `Ability`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AbilityToPokemon` ADD CONSTRAINT `AbilityToPokemon_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
