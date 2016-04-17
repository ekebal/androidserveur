-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';



-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `pseudo` VARCHAR(45) NOT NULL,
  `password_hash` text NOT NULL,
  `api_key` varchar(32) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `pseudo_UNIQUE` (`pseudo` ASC))
ENGINE = InnoDB;

 

-- -----------------------------------------------------
-- Table `category_service`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category_service` ;

CREATE TABLE IF NOT EXISTS `category_service` (
  `id_category_service` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_category_service`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `service` ;

CREATE TABLE IF NOT EXISTS `service` (
  `id_service` INT NOT NULL AUTO_INCREMENT,
  `titre` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `price` DOUBLE NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `latitude` DOUBLE NOT NULL,
  `longituge` DOUBLE NOT NULL,
  `publication_date` DATETIME NOT NULL,
  `id_category_service` INT NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  `id_provider` INT NOT NULL,
  PRIMARY KEY (`id_service`, `id_provider`),
  INDEX `fk_service_category_service_idx` (`id_category_service` ASC),
  INDEX `fk_service_user1_idx` (`id_provider` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `message` ;

CREATE TABLE IF NOT EXISTS `message` (
  `idmessage` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(255) NOT NULL,
  `id_sender` INT NOT NULL,
  `id_reciver` INT NOT NULL,
  `readed` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idmessage`),
  INDEX `fk_message_user1_idx` (`id_sender` ASC),
  INDEX `fk_message_user2_idx` (`id_reciver` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_buy_service`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_buy_service` ;

CREATE TABLE IF NOT EXISTS `user_buy_service` (
  `id_user_buy_service` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `id_service` INT NOT NULL,
  `payment_code` VARCHAR(255) NOT NULL,
  `code` VARCHAR(255) NOT NULL,
  `code_valid` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_user_buy_service`),
  INDEX `fk_user_has_service_service1_idx` (`id_service` ASC),
  INDEX `fk_user_has_service_user1_idx` (`id_user` ASC),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `commentaire`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `commentaire` ;

CREATE TABLE IF NOT EXISTS `commentaire` (
  `id_commentaire` INT NOT NULL AUTO_INCREMENT,
  `commentaire` VARCHAR(255) NOT NULL,
  `id_service` INT NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_commentaire`),
  INDEX `fk_commentaire_service1_idx` (`id_service` ASC),
  INDEX `fk_commentaire_user1_idx` (`id_user` ASC))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
