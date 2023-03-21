CREATE TABLE `quai_antique`.`booking` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `NbrPersonnes` INT NOT NULL,
  `date` DATE NOT NULL,
  `heures` TIME NOT NULL,
  `nom` VARCHAR(50) NOT NULL,
  `Num_téléphone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(75) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;
