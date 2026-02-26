-- SQL Data for adding personnel to NERD-MarsAI-Back Festival Data
-- Generation Date: 2024-07-30
-- This script should be run AFTER `donnees_fictives.sql` to add more directors,
-- users (admin, jury, super admin), and roles.

SET FOREIGN_KEY_CHECKS=0; -- Disable foreign key checks for easier insertion

--
-- Add 'Super Administrateur' role if it doesn't exist
--
INSERT INTO `role` (`id`, `name`) VALUES (5, 'Super Administrateur');

--
-- Data for additional directors (27 more, starting from ID 4)
-- Assuming Director IDs 1, 2, 3 already exist from `donnees_fictives.sql`
--
INSERT INTO `director` (`id`, `firstname`, `lastname`, `gender`, `birthday`, `email`, `mobile`, `address`, `zip_code`, `town`, `country`, `job`, `youtube_url`, `instagram_url`, `linkedin_url`, `facebook_url`, `twitter_url`, `question_about`, `newsletter`, `created_at`, `updated_at`) VALUES
(4, 'Sophie', 'Dubois', 'Mme', '1988-01-20 00:00:00', 'sophie.dubois@director.ai', '0611223345', '12 Rue de la Forge', '75003', 'Paris', 'France', 'Réalisatrice', NULL, NULL, NULL, NULL, NULL, 'Autre festival', 1, NOW(), NOW()),
(5, 'Marc', 'Lefevre', 'M.', '1975-06-05 00:00:00', 'marc.lefevre@director.ai', '0622334456', '34 Avenue des Arts', '69002', 'Lyon', 'France', 'Cinéaste IA', NULL, NULL, NULL, NULL, NULL, 'Presse / Média', 0, NOW(), NOW()),
(6, 'Lena', 'Durand', 'Mme', '1992-09-12 00:00:00', 'lena.durand@director.ai', '0633445567', '56 Rue du Centre', '13001', 'Marseille', 'France', 'Animatrice IA', NULL, NULL, NULL, NULL, NULL, 'Partenaire', 1, NOW(), NOW()),
(7, 'Paul', 'Moreau', 'M.', '1980-03-23 00:00:00', 'paul.moreau@director.ai', '0644556678', '78 Boulevard de la Liberté', '31000', 'Toulouse', 'France', 'Scénariste IA', NULL, NULL, NULL, NULL, NULL, 'Autre', 0, NOW(), NOW()),
(8, 'Julia', 'Martin', 'Mme', '1995-11-01 00:00:00', 'julia.martin@director.ai', '0655667789', '90 Rue de la Gare', '33000', 'Bordeaux', 'France', 'Directrice Artistique', NULL, NULL, NULL, NULL, NULL, 'Presse / Média', 1, NOW(), NOW()),
(9, 'Remi', 'Bernard', 'M.', '1978-02-14 00:00:00', 'remi.bernard@director.ai', '0666778890', '11 Rue des Peupliers', '59000', 'Lille', 'France', 'Réalisateur Expérimental', NULL, NULL, NULL, NULL, NULL, 'Autre festival', 0, NOW(), NOW()),
(10, 'Chloe', 'Simon', 'Mme', '1990-07-28 00:00:00', 'chloe.simon@director.ai', '0677889901', '22 Avenue du Parc', '67000', 'Strasbourg', 'France', 'Monteuse IA', NULL, NULL, NULL, NULL, NULL, 'Partenaire', 1, NOW(), NOW()),
(11, 'Thibaut', 'Robert', 'M.', '1983-04-10 00:00:00', 'thibaut.robert@director.ai', '0688990012', '33 Rue de la Forêt', '44000', 'Nantes', 'France', 'Créateur de Contenu IA', NULL, NULL, NULL, NULL, NULL, 'Autre', 0, NOW(), NOW()),
(12, 'Manon', 'Richard', 'Mme', '1996-12-18 00:00:00', 'manon.richard@director.ai', '0699001123', '45 Boulevard des Roses', '34000', 'Montpellier', 'France', 'VFX Supervisor IA', NULL, NULL, NULL, NULL, NULL, 'Presse / Média', 1, NOW(), NOW()),
(13, 'Hugo', 'Dubois', 'M.', '1981-05-03 00:00:00', 'hugo.dubois@director.ai', '0610112234', '67 Rue des Champs', '35000', 'Rennes', 'France', 'Réalisateur Documentaire IA', NULL, NULL, NULL, NULL, NULL, 'Autre festival', 0, NOW(), NOW()),
(14, 'Lea', 'Laurent', 'Mme', '1993-08-08 00:00:00', 'lea.laurent@director.ai', '0621223345', '89 Avenue de la Plage', '06000', 'Nice', 'France', 'Designer 3D IA', NULL, NULL, NULL, NULL, NULL, 'Partenaire', 1, NOW(), NOW()),
(15, 'Enzo', 'Fournier', 'M.', '1986-10-25 00:00:00', 'enzo.fournier@director.ai', '0632334456', '10 Rue de la Paix', '75002', 'Paris', 'France', 'Storyteller IA', NULL, NULL, NULL, NULL, NULL, 'Autre', 0, NOW(), NOW()),
(16, 'Camille', 'Mercier', 'Mme', '1991-04-01 00:00:00', 'camille.mercier@director.ai', '0643445567', '21 Rue du Château', '69007', 'Lyon', 'France', 'Directrice de la Photographie IA', NULL, NULL, NULL, NULL, NULL, 'Presse / Média', 1, NOW(), NOW()),
(17, 'Arthur', 'Blanc', 'M.', '1979-01-16 00:00:00', 'arthur.blanc@director.ai', '0654556678', '32 Boulevard Victor Hugo', '34000', 'Montpellier', 'France', 'Réalisateur Futuriste', NULL, NULL, NULL, NULL, NULL, 'Autre festival', 0, NOW(), NOW()),
(18, 'Margaux', 'Thomas', 'Mme', '1994-06-29 00:00:00', 'margaux.thomas@director.ai', '0665667789', '43 Avenue Jean Jaurès', '31000', 'Toulouse', 'France', 'Artiste Concept IA', NULL, NULL, NULL, NULL, NULL, 'Partenaire', 1, NOW(), NOW()),
(19, 'Louis', 'Robert', 'M.', '1982-09-07 00:00:00', 'louis.robert@director.ai', '0676778890', '54 Rue de la République', '13002', 'Marseille', 'France', 'Développeur IA Cinéma', NULL, NULL, NULL, NULL, NULL, 'Autre', 0, NOW(), NOW()),
(20, 'Clara', 'Richard', 'Mme', '1997-03-11 00:00:00', 'clara.richard@director.ai', '0687889901', '65 Chemin des Vignes', '44300', 'Nantes', 'France', 'Créatrice Univers IA', NULL, NULL, NULL, NULL, NULL, 'Presse / Média', 1, NOW(), NOW()),
(21, 'Mathis', 'Petit', 'M.', '1984-11-20 00:00:00', 'mathis.petit@director.ai', '0698990012', '76 Place du Marché', '59800', 'Lille', 'France', 'Designer Interactif IA', NULL, NULL, NULL, NULL, NULL, 'Autre festival', 0, NOW(), NOW()),
(22, 'Alice', 'Leroy', 'Mme', '1998-05-15 00:00:00', 'alice.leroy@director.ai', '0619001123', '87 Rue des Écoles', '67100', 'Strasbourg', 'France', 'Spécialiste Synthèse Vocale IA', NULL, NULL, NULL, NULL, NULL, 'Partenaire', 1, NOW(), NOW()),
(23, 'Gabriel', 'Simon', 'M.', '1987-07-02 00:00:00', 'gabriel.simon@director.ai', '0620112234', '98 Avenue Foch', '33000', 'Bordeaux', 'France', 'Artiste Génératif', NULL, NULL, NULL, NULL, NULL, 'Autre', 0, NOW(), NOW()),
(24, 'Jeanne', 'Fournier', 'Mme', '1992-02-28 00:00:00', 'jeanne.fournier@director.ai', '0631223345', '19 Rue du Soleil', '35700', 'Rennes', 'France', 'Réalisatrice VR IA', NULL, NULL, NULL, NULL, NULL, 'Presse / Média', 1, NOW(), NOW()),
(25, 'Raphaël', 'Mercier', 'M.', '1989-09-19 00:00:00', 'raphael.mercier@director.ai', '0642334456', '20 Place de la Comédie', '06000', 'Nice', 'France', 'Ingénieur Prompts IA', NULL, NULL, NULL, NULL, NULL, 'Autre festival', 0, NOW(), NOW()),
(26, 'Ines', 'Blanc', 'Mme', '1999-11-05 00:00:00', 'ines.blanc@director.ai', '0653445567', '30 Rue des Lilas', '75010', 'Paris', 'France', 'Productrice Exécutive IA', NULL, NULL, NULL, NULL, NULL, 'Partenaire', 1, NOW(), NOW()),
(27, 'Maxime', 'Thomas', 'M.', '1985-03-08 00:00:00', 'maxime.thomas@director.ai', '0664556678', '40 Avenue du Général Leclerc', '69003', 'Lyon', 'France', 'Consultant IA Cinéma', NULL, NULL, NULL, NULL, NULL, 'Autre', 0, NOW(), NOW()),
(28, 'Zoe', 'Robert', 'Mme', '1991-10-14 00:00:00', 'zoe.robert@director.ai', '0675667789', '50 Rue de la République', '13006', 'Marseille', 'France', 'Chercheuse IA Art', NULL, NULL, NULL, NULL, NULL, 'Presse / Média', 1, NOW(), NOW()),
(29, 'Tom', 'Richard', 'M.', '1980-12-01 00:00:00', 'tom.richard@director.ai', '0686778890', '60 Boulevard des Anglais', '44100', 'Nantes', 'France', 'Réalisateur Fiction IA', NULL, NULL, NULL, NULL, NULL, 'Autre festival', 0, NOW(), NOW()),
(30, 'Elisa', 'Petit', 'Mme', '1994-02-09 00:00:00', 'elisa.petit@director.ai', '0697889901', '70 Rue de la Liberté', '31000', 'Toulouse', 'France', 'Scénographe IA', NULL, NULL, NULL, NULL, NULL, 'Partenaire', 1, NOW(), NOW());


--
-- Data for additional users (1 Admin, 5 Jury, 1 Super Admin)
-- User IDs 1, 2, 3, 4 already exist from `donnees_fictives.sql`
--
INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `password`, `created_at`, `updated_at`, `festival_id`) VALUES
(5, 'Philippe', 'Marchand', 'philippe.marchand@admin.com', '$2b$10$fakePasswordHashAdmin2', NOW(), NOW(), 1), -- New Admin
(6, 'Eva', 'Garcia', 'eva.garcia@jury.com', '$2b$10$fakePasswordHashJury1', NOW(), NOW(), 1), -- New Jury
(7, 'Lucas', 'Roux', 'lucas.roux@jury.com', '$2b$10$fakePasswordHashJury2', NOW(), NOW(), 1), -- New Jury
(8, 'Anna', 'Lefevre', 'anna.lefevre@jury.com', '$2b$10$fakePasswordHashJury3', NOW(), NOW(), 1), -- New Jury
(9, 'David', 'Moreau', 'david.moreau@jury.com', '$2b$10$fakePasswordHashJury4', NOW(), NOW(), 1), -- New Jury
(10, 'Sophia', 'Dubois', 'sophia.dubois@jury.com', '$2b$10$fakePasswordHashJury5', NOW(), NOW(), 1), -- New Jury
(11, 'Max', 'Leroy', 'max.leroy@superadmin.com', '$2b$10$fakePasswordHashSuperAdmin1', NOW(), NOW(), 1); -- New Super Admin


--
-- Data for `have` (linking new users to roles)
-- Existing links from `donnees_fictives.sql` are: (1,1 Admin), (2,2 Jury), (3,3 Spectator), (4,4 Organisateur)
--
INSERT INTO `have` (`role_id`, `user_id`) VALUES
(1, 5),  -- Philippe Marchand is an Admin
(2, 6),  -- Eva Garcia is Jury
(2, 7),  -- Lucas Roux is Jury
(2, 8),  -- Anna Lefevre is Jury
(2, 9),  -- David Moreau is Jury
(2, 10), -- Sophia Dubois is Jury
(5, 11); -- Max Leroy is Super Administrateur

SET FOREIGN_KEY_CHECKS=1; -- Re-enable foreign key checks