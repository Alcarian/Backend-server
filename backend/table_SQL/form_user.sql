
CREATE TABLE `form_user` (
  `id_form_user` int(10) UNSIGNED NOT NULL,
  `form_user_userId` int(10) UNSIGNED NOT NULL,
  `form_user_name` varchar(75) NOT NULL,
  `nbr_couverts` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `form_user` MODIFY `nbr_couverts` INTEGER NOT NULL CHECK (`nbr_couverts` >= 1 AND `nbr_couverts` <= 10);
