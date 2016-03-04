-- -----------------------------------------------------
-- CONSTANTS - DO NOT CHANGE -
-- -----------------------------------------------------
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema schedulator
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema schedulator
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `schedulator` DEFAULT CHARACTER SET utf8 ;
USE `schedulator` ;

-- -----------------------------------------------------
-- Table `schedulator`.`login_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedulator`.`login_info` (
  `id` VARCHAR(45) NOT NULL,
  `pass` VARCHAR(24) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedulator`.`student_record`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedulator`.`student_record` (
  `id` VARCHAR(8) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `credits_completed` INT(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedulator`.`courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedulator`.`courses` (
  `course_id` VARCHAR(7) NOT NULL,
  `class_type` VARCHAR(15) NOT NULL,
  `section` VARCHAR(2) NOT NULL,
  `start_time` VARCHAR(5) NOT NULL,
  `end_time` VARCHAR(5) NOT NULL,
  `days` VARCHAR(45) NOT NULL,
  `professor_name` VARCHAR(45) NOT NULL,
  `room` VARCHAR(15) NOT NULL,
  `prerequisite` VARCHAR(45) NOT NULL,
  `semester` VARCHAR(45) NULL,
  PRIMARY KEY (`course_id`, `section`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedulator`.`courses_completed`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedulator`.`courses_completed` (
  `course_id` VARCHAR(7) NOT NULL,
  `student_id` VARCHAR(24) NOT NULL,
  PRIMARY KEY (`course_id`, `student_id`),
  INDEX `fk_courses_completed_account_information1_idx` (`student_id` ASC),
  CONSTRAINT `fk_courses_completed_account_information1`
    FOREIGN KEY (`student_id`)
    REFERENCES `schedulator`.`student_record` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
