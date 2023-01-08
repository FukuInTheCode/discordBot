
DROP SCHEMA IF EXISTS `fubot_users`;

CREATE SCHEMA IF NOT EXISTS `fubot_users` DEFAULT CHARACTER SET utf8mb4 ;

CREATE TABLE `fubot_users`.`user_infos` (
  `user_id` VARCHAR(255) NOT NULL,
  `user_username` VARCHAR(255) NOT NULL,
  `user_ismod` TINYINT(1) NOT NULL DEFAULT 0,
  `user_isbot` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COMMENT = 'All of the user informations require for the bot.';

CREATE TABLE `fubot_users`.`user_profiles` (
  `user_id` VARCHAR(255) NOT NULL,
  `user_username` VARCHAR(255) NOT NULL,
  `user_level` INT NOT NULL DEFAULT 1,
  `user_xp` INT NOT NULL DEFAULT 0,
  `user_coins` INT NOT NULL DEFAULT 100,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COMMENT = 'Informations require for the bot.';

CREATE TABLE `fubot_users`.`user_inventories` (
  `user_id` VARCHAR(255) NOT NULL,
  `user_username` VARCHAR(255) NOT NULL,
  `user_inventory` JSON NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COMMENT = 'json files for each user for their inventory.';

USE `fubot_users`;
DROP procedure IF EXISTS `get_user`;

DELIMITER $$
USE `fubot_users`$$
CREATE PROCEDURE `get_user` (id VARCHAR(255), username varchar(255))
BEGIN
	declare tmp varchar(255);
	SELECT count(*) into tmp FROM fubot_users.user_infos WHERE user_id = id;
	IF tmp = 0 THEN
		INSERT INTO fubot_users.user_infos (user_id, user_username) VALUES (id, username);
        INSERT INTO fubot_users.user_profiles (user_id, user_username) VALUES (id, username);
        SELECT ui.user_id, ui.user_username, up.user_level, up.user_xp, up.user_coins 
			FROM fubot_users.user_infos AS ui
            JOIN fubot_users.user_profiles AS up ON ui.user_id = up.user_id
            WHERE ui.user_id = id;
	ELSE 
		SELECT ui.user_id, ui.user_username, up.user_level, up.user_xp, up.user_coins 
				FROM fubot_users.user_infos AS ui
				JOIN fubot_users.user_profiles AS up ON ui.user_id = up.user_id
				WHERE ui.user_id = id;
    END IF;
END;$$

DELIMITER ;

-- --------------------------------------------------------------------- --
-- --------------------------------------------------------------------- --
-- --------------------------------------------------------------------- --


DROP SCHEMA IF EXISTS `fubot_servers`;

CREATE SCHEMA `fubot_servers` DEFAULT CHARACTER SET utf8mb4 ;

CREATE TABLE `fubot_servers`.`server_infos` (
  `server_id` VARCHAR(255) NOT NULL,
  `server_name` VARCHAR(255) NOT NULL,
  `server_owner_id` VARCHAR(255) NOT NULL,
  `server_users` INT NOT NULL,
  `server_isbeta` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`server_id`),
  UNIQUE INDEX `server_id_UNIQUE` (`server_id` ASC) VISIBLE);
