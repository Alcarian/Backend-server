CREATE TABLE `user` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `Nom` VARCHAR(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
    `nbrCouvert` INT(11) NOT NULL CHECK (`nbrCouvert` >= 1 AND `nbrCouvert` <= 10);
    `email` VARCHAR(75) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
    `password` VARCHAR(75) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
    `timestamp` DATETIME NULL DEFAULT CURRENT_TIMESTAMP;
)