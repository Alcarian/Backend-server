CREATE TABLE semaine (
    jour_semaine VARCHAR(20) PRIMARY KEY,
    entree VARCHAR(50),
    plat VARCHAR(50),
    dessert VARCHAR(50),
    description_entree VARCHAR(255),
    description_plat VARCHAR(255),
    description_dessert VARCHAR(255)
);


//ajouter les donnéees

INSERT INTO semaine (jour_semaine, entree, plat, dessert, description_entree, description_plat, description_dessert)
VALUES 
    ('Lundi', 'Salade de tomates', 'Steak frites', 'Tarte aux pommes', 'Salade de tomates avec de la feta et des olives', 'Steak de boeuf grillé avec des frites maison', 'Tarte aux pommes maison avec une croûte croustillante'),

    ('Mardi', 'Soupe à l\'oignon', 'Ragoût de boeuf', 'Crème brûlée', 'Soupe à l\'oignon gratinée avec du fromage fondant', 'Ragoût de boeuf mijoté avec des légumes', 'Crème brûlée avec une croûte de sucre caramélisé'),

    ('Mercredi', 'Salade de chèvre chaud', 'Poulet rôti', 'Mousse au chocolat', 'Salade de laitue avec du fromage de chèvre chaud et des noix', 'Poulet rôti croustillant avec des pommes de terre rôties', 'Mousse au chocolat légère et aérienne'),

    ('Jeudi', 'Potage aux légumes', 'Poisson grillé', 'Salade de fruits', 'Potage aux légumes frais de saison', 'Filet de poisson grillé avec une sauce citronnée', 'Salade de fruits frais coupés'),

    ('Vendredi', 'Gaspacho', 'Burger végétarien', 'Gâteau au fromage', 'Gaspacho froid et rafraîchissant', 'Burger végétarien avec du cheddar fondu et des frites', 'Gâteau au fromage crémeux avec une croûte aux biscuits'),

    ('Samedi', 'Bruschetta', 'Risotto aux champignons', 'Tiramisu', 'Bruschetta à la tomate avec du basilic frais', 'Risotto crémeux aux champignons sauvages', 'Tiramisu italien classique avec du mascarpone'),
    
    ('Dimanche', 'Croissants frais', 'Boeuf bourguignon', 'Crêpes', 'Croissants chauds et croustillants avec de la confiture', 'Boeuf bourguignon mijoté pendant des heures', 'Crêpes légères et moelleuses avec de la confiture ou du sirop d\'érable');
