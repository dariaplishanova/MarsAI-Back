-- SQL Data Seed and Schema Definition for NERD-MarsAI-Back
-- Generation Date: 2024-07-30
-- This script provides a corrected and more exhaustive schema,
-- including CREATE TABLE statements with UNIQUE constraints,
-- and comprehensive INSERT statements for fictitious data.

-- Disable foreign key checks to avoid order issues during schema changes and data insertion
SET FOREIGN_KEY_CHECKS=0;

-- Drop tables in reverse order of dependency to avoid foreign key constraints issues
DROP TABLE IF EXISTS `books`;
DROP TABLE IF EXISTS `have`;
DROP TABLE IF EXISTS `rating`;
DROP TABLE IF EXISTS `movie_tag`;
DROP TABLE IF EXISTS `collaborator`;
DROP TABLE IF EXISTS `image`;
DROP TABLE IF EXISTS `participant`;
DROP TABLE IF EXISTS `event`;
DROP TABLE IF EXISTS `movie`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `director`;
DROP TABLE IF EXISTS `role`;
DROP TABLE IF EXISTS `tag`;
DROP TABLE IF EXISTS `festival`;

--
-- Table structure for `festival`
--
CREATE TABLE `festival` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL UNIQUE, -- Added UNIQUE constraint
  `description` TEXT NOT NULL, -- Corrected typo from 'decription' to 'description'
  `created_at` DATETIME NOT NULL,
  `start_at` DATETIME NOT NULL,
  `end_at` DATETIME NOT NULL,
  `status` ENUM('Actif', 'Inactif') NOT NULL,
  `booking_total` INT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for `role`
--
CREATE TABLE `role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL UNIQUE, -- Added UNIQUE constraint
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for `tag`
--
CREATE TABLE `tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL UNIQUE, -- Added UNIQUE constraint
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for `user`
--
CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE, -- Added UNIQUE constraint
  `password` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL, -- Changed from DATE to DATETIME for consistency
  `updated_at` DATETIME NOT NULL, -- Changed from DATE to DATETIME for consistency
  `festival_id` INT NULL, -- Allowed NULL as per schema, but could be NOT NULL if user MUST belong to a festival
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_festival_id` FOREIGN KEY (`festival_id`) REFERENCES `festival` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for `have` (User roles)
--
CREATE TABLE `have` (
  `role_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`role_id`, `user_id`),
  CONSTRAINT `fk_have_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_have_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for `director`
--
CREATE TABLE `director` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `gender` ENUM('M.', 'Mme') NOT NULL, -- Renamed 'genre' to 'gender' for clarity based on ENUM type
  `birthday` DATETIME NOT NULL, -- Changed from DATE to DATETIME for consistency
  `email` VARCHAR(100) NOT NULL UNIQUE, -- Added UNIQUE constraint
  `mobile` VARCHAR(50) NOT NULL,
  `address` VARCHAR(255) NULL, -- Allowed NULL as per original schema for some fields
  `zip_code` VARCHAR(20) NULL,
  `town` VARCHAR(100) NULL,
  `country` VARCHAR(100) NULL,
  `job` VARCHAR(100) NOT NULL,
  `youtube_url` VARCHAR(255) NULL, -- Allowed NULL
  `instagram_url` VARCHAR(255) NULL, -- Allowed NULL
  `linkedin_url` VARCHAR(255) NULL, -- Allowed NULL
  `facebook_url` VARCHAR(255) NULL, -- Allowed NULL
  `twitter_url` VARCHAR(255) NULL, -- Allowed NULL
  `question_about` ENUM('Réseaux sociaux', 'Moteur de recherche', 'Bouche-à-oreille', 'Presse / Média', 'Autre festival', 'Partenaire', 'Autre') NULL, -- Clarified ENUM based on provided text snippet
  `newsletter` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL, -- Changed from DATE to DATETIME
  `updated_at` DATETIME NOT NULL, -- Changed from DATE to DATETIME
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for `movie`
--
CREATE TABLE `movie` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` TEXT NOT NULL,
  `title_en` VARCHAR(255) UNIQUE NULL, -- Added UNIQUE constraint for English title
  `synopsis_fr` TEXT NULL,
  `synopsis_en` TEXT NULL,
  `duration` INT NULL,
  `main_language` VARCHAR(50) NULL,
  `yt_url` VARCHAR(255) NOT NULL, -- Changed from TEXT to VARCHAR(255) for URL
  `thumbnail` VARCHAR(255) NOT NULL, -- Changed from TEXT to VARCHAR(255) for URL
  `subtitles` VARCHAR(255) NULL, -- Changed from TEXT to VARCHAR(255)
  `stack` TEXT NULL,
  `methodology` TEXT NULL,
  `ia_type` ENUM('100% IA', 'Hybride') NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` DATETIME NOT NULL,
  `director_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_movie_director_id` FOREIGN KEY (`director_id`) REFERENCES `director` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for `movie_tag`
--
CREATE TABLE `movie_tag` (
  `movie_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`movie_id`, `tag_id`),
  CONSTRAINT `fk_movie_tag_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_movie_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for `image` (for movie galleries)
--
CREATE TABLE `image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `movie_id` INT NULL, -- Allowed NULL, but typically an image should belong to a movie
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_image_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for `collaborator`
--
CREATE TABLE `collaborator` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `gender` ENUM('Mr', 'Mme') NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE, -- Added UNIQUE constraint
  `job` TEXT NOT NULL,
  `movie_id` INT NULL, -- Allowed NULL
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_collaborator_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for `participant`
--
CREATE TABLE `participant` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE, -- Added UNIQUE constraint
  `mobile` VARCHAR(20) NOT NULL,
  `job` VARCHAR(100) NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for `event`
--
CREATE TABLE `event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `start_at` DATETIME NOT NULL, -- Changed from DATE to DATETIME
  `end_at` DATETIME NOT NULL, -- Changed from DATE to DATETIME
  `capacity` INT NOT NULL,
  `remaining_seats` INT NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `status` ENUM('Ouvert', 'Fermer') NOT NULL,
  `festival_id` INT NULL, -- Allowed NULL as per schema
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_event_festival_id` FOREIGN KEY (`festival_id`) REFERENCES `festival` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for `books` (linking participants to events)
--
CREATE TABLE `books` (
  `participant_id` INT NOT NULL,
  `event_id` INT NOT NULL,
  PRIMARY KEY (`participant_id`, `event_id`),
  CONSTRAINT `fk_books_participant_id` FOREIGN KEY (`participant_id`) REFERENCES `participant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_books_event_id` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for `rating` (user ratings for movies)
--
CREATE TABLE `rating` (
  `user_id` INT NOT NULL,
  `movie_id` INT NOT NULL,
  `score_creativity` INT NOT NULL,
  `score_technical` INT NOT NULL,
  `score_message` INT NOT NULL,
  `comment` TEXT NOT NULL,
  `score_total` FLOAT NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`user_id`, `movie_id`),
  CONSTRAINT `fk_rating_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rating_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Data for table `festival`
--
INSERT INTO `festival` (`id`, `name`, `description`, `created_at`, `start_at`, `end_at`, `status`, `booking_total`) VALUES
(1, 'Mars AI Film Festival 2024', 'Le premier festival de films générés ou assistés par intelligence artificielle. Un événement dédié à l''innovation cinématographique.', NOW(), '2024-10-15 09:00:00', '2024-10-18 23:00:00', 'Actif', 500);

--
-- Data for table `role`
--
INSERT INTO `role` (`id`, `name`) VALUES
(1, 'Administrateur'),
(2, 'Jury'),
(3, 'Spectateur'),
(4, 'Organisateur');

--
-- Data for table `tag`
--
INSERT INTO `tag` (`id`, `name`) VALUES
(1, 'Science-Fiction'),
(2, 'Drame'),
(3, 'Animation'),
(4, 'Thriller'),
(5, 'Expérimental'),
(6, 'Comédie');

--
-- Data for table `user`
--
INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `password`, `created_at`, `updated_at`, `festival_id`) VALUES
(1, 'Jean', 'Dupont', 'jean.dupont@email.com', '$2b$10$fakePasswordHash123456', NOW(), NOW(), 1),
(2, 'Marie', 'Curie', 'marie.curie@email.com', '$2b$10$anotherFakeHash789012', NOW(), NOW(), 1),
(3, 'Albert', 'Einstein', 'albert.einstein@email.com', '$2b$10$superFakeHash555666', NOW(), NOW(), 1),
(4, 'Ada', 'Lovelace', 'ada.lovelace@email.com', '$2b$10$moreFakeHash777888', NOW(), NOW(), 1);

--
-- Data for table `have` (linking users to roles)
--
INSERT INTO `have` (`role_id`, `user_id`) VALUES
(1, 1), -- Jean Dupont is an Administrator
(2, 2), -- Marie Curie is a Jury member
(3, 3), -- Albert Einstein is a Spectator
(4, 4); -- Ada Lovelace is an Organisateur

--
-- Data for table `director`
--
INSERT INTO `director` (`id`, `firstname`, `lastname`, `gender`, `birthday`, `email`, `mobile`, `address`, `zip_code`, `town`, `country`, `job`, `youtube_url`, `instagram_url`, `linkedin_url`, `facebook_url`, `twitter_url`, `question_about`, `newsletter`, `created_at`, `updated_at`) VALUES
(1, 'Isaac', 'Bell', 'M.', '1990-05-15 00:00:00', 'isaac.bell@director.ai', '0601020304', '10 Rue de la Paix', '75002', 'Paris', 'France', 'Réalisateur IA', 'https://www.youtube.com/@DUST', NULL, NULL, NULL, NULL, 'Presse / Média', 1, NOW(), NOW()),
(2, 'Martin', 'McDonagh', 'M.', '1970-03-26 00:00:00', 'martin.m@director.ai', '0605060708', '25 Abbey Road', 'NW8', 'London', 'UK', 'Réalisateur / Scénariste', NULL, NULL, NULL, NULL, NULL, 'Autre', 0, NOW(), NOW()),
(3, 'Helena', 'Almeida', 'Mme', '1985-11-20 00:00:00', 'helena.a@director.ai', '0609101112', 'Av. da Liberdade 100', '1250-145', 'Lisbonne', 'Portugal', 'Animatrice / Réalisatrice', NULL, NULL, NULL, NULL, NULL, 'Partenaire', 1, NOW(), NOW());

--
-- Data for table `movie`
--
INSERT INTO `movie` (`id`, `title`, `title_en`, `synopsis_fr`, `synopsis_en`, `duration`, `main_language`, `yt_url`, `thumbnail`, `subtitles`, `stack`, `methodology`, `ia_type`, `status`, `created_at`, `director_id`) VALUES
(1, 'La Machine', 'The Machine', 'Dans un futur proche, un androïde de combat développe une conscience et remet en question sa programmation.', 'In the near future, a combat android develops consciousness and questions its programming.', 12, 'Anglais', 'https://www.youtube.com/watch?v=1YJsxMcAJoA', 'https://i.ytimg.com/vi/1YJsxMcAJoA/maxresdefault.jpg', 'Français, Anglais', 'RunwayML, Kaiber', 'Génération d''images, deepfake', '100% IA', 'approved', NOW(), 1),
(2, 'Le Bègue', 'Stutterer', 'Un typographe solitaire avec un bégaiement sévère doit faire face à sa plus grande peur.', 'A lonely typographer with a severe stutter must face his greatest fear.', 13, 'Anglais', 'https://www.youtube.com/watch?v=2m_VTZR5gzw', 'https://i.ytimg.com/vi/2m_VTZR5gzw/maxresdefault.jpg', 'Français', 'Aucun', 'Film traditionnel', 'Hybride', 'pending', NOW(), 2),
(3, 'Parapluie', 'Umbrella', 'L''histoire de Joseph, un garçon qui vit dans un orphelinat et rêve d''avoir un parapluie jaune.', 'The story of Joseph, a boy who lives in an orphanage and dreams of having a yellow umbrella.', 8, 'Muet', 'https://www.youtube.com/watch?v=Bl1FOKpFY2Q', 'https://i.ytimg.com/vi/Bl1FOKpFY2Q/maxresdefault.jpg', 'N/A', 'Blender, ZBrush', 'Animation 3D assistée par IA pour le rendu', 'Hybride', 'approved', NOW(), 3),
(4, 'L\'Étoile Oubliée', 'The Forgotten Star', 'Une exploration poétique de la mémoire et de l''oubli, racontée à travers les yeux d''un vieil astronome.', 'A poetic exploration of memory and oblivion, told through the eyes of an old astronomer.', 15, 'Français', 'https://www.youtube.com/watch?v=example4', 'https://via.placeholder.com/1920x1080.png?text=ForgottenStar', 'Anglais', 'Midjourney, Stable Diffusion', 'Création d''environnements, character design', 'Hybride', 'pending', NOW(), 1);

--
-- Data for table `movie_tag` (linking movies to tags)
--
INSERT INTO `movie_tag` (`movie_id`, `tag_id`) VALUES
(1, 1), -- La Machine -> Science-Fiction
(1, 5), -- La Machine -> Expérimental
(2, 2), -- Le Bègue -> Drame
(3, 2), -- Parapluie -> Drame
(3, 3), -- Parapluie -> Animation
(4, 1), -- L'Étoile Oubliée -> Science-Fiction
(4, 2), -- L'Étoile Oubliée -> Drame
(4, 5); -- L'Étoile Oubliée -> Expérimental

--
-- Data for table `image` (for movie galleries)
--
INSERT INTO `image` (`id`, `url`, `created_at`, `movie_id`) VALUES
(1, 'https://via.placeholder.com/1920x1080.png?text=La+Machine+Scene+1', NOW(), 1),
(2, 'https://via.placeholder.com/1920x1080.png?text=La+Machine+Scene+2', NOW(), 1),
(3, 'https://via.placeholder.com/1920x1080.png?text=Le+Begue+Scene+1', NOW(), 2),
(4, 'https://via.placeholder.com/1920x1080.png?text=Parapluie+Scene+1', NOW(), 3),
(5, 'https://via.placeholder.com/1920x1080.png?text=ForgottenStar+Poster', NOW(), 4),
(6, 'https://via.placeholder.com/1920x1080.png?text=ForgottenStar+Scene', NOW(), 4);

--
-- Data for table `collaborator`
--
INSERT INTO `collaborator` (`id`, `firstname`, `lastname`, `gender`, `email`, `job`, `movie_id`) VALUES
(1, 'Alex', 'Rider', 'Mr', 'alex.r@actor.com', 'Acteur Principal', 1),
(2, 'Sarah', 'Connor', 'Mme', 'sarah.c@actor.com', 'Actrice Secondaire', 1),
(3, 'John', 'Doe', 'Mr', 'j.doe@sound.com', 'Compositeur de musique originale', 1),
(4, 'Greenwood', 'Jones', 'Mr', 'g.jones@actor.com', 'Acteur principal', 2),
(5, 'Elena', 'Varela', 'Mme', 'e.varela@actor.com', 'Actrice principale', 2),
(6, 'Alan', 'Turing', 'Mr', 'alan.t@animator.com', 'Animateur 3D', 3),
(7, 'Grace', 'Hopper', 'Mme', 'grace.h@vfx.com', 'Artiste VFX', 4);

--
-- Data for table `participant`
--
INSERT INTO `participant` (`id`, `firstname`, `lastname`, `email`, `mobile`, `job`, `created_at`) VALUES
(1, 'Chris', 'Nolan', 'chris.nolan@participant.com', '0712345678', 'Cinéphile', NOW()),
(2, 'Denis', 'Villeneuve', 'denis.v@participant.com', '0787654321', 'Etudiant en cinéma', NOW()),
(3, 'Kathryn', 'Bigelow', 'kathryn.b@participant.com', '0798765432', 'Journaliste cinéma', NOW());

--
-- Data for table `event`
--
INSERT INTO `event` (`id`, `title`, `start_at`, `end_at`, `capacity`, `remaining_seats`, `location`, `description`, `status`, `festival_id`) VALUES
(1, 'Projection des films Sci-Fi', '2024-10-16 14:00:00', '2024-10-16 16:00:00', 150, 150, 'Salle 1', 'Séance dédiée aux films de science-fiction en compétition.', 'Ouvert', 1),
(2, 'Masterclass Animation & IA', '2024-10-17 10:00:00', '2024-10-17 12:00:00', 50, 50, 'Salle 2', 'Rencontre avec des réalisateurs sur les nouvelles techniques d''animation assistées par IA.', 'Ouvert', 1),
(3, 'Table Ronde: Futur du Cinéma', '2024-10-17 15:00:00', '2024-10-17 17:00:00', 100, 100, 'Amphithéâtre', 'Discussion avec des experts sur l''impact de l''IA sur l''industrie cinématographique.', 'Ouvert', 1);

--
-- Data for table `books` (linking participants to events)
--
INSERT INTO `books` (`participant_id`, `event_id`) VALUES
(1, 1), -- Chris Nolan is booked for the Sci-Fi screening
(2, 1), -- Denis Villeneuve is also booked for the Sci-Fi screening
(2, 2), -- Denis Villeneuve is also booked for the Masterclass
(3, 3); -- Kathryn Bigelow is booked for the Round Table

--
-- Data for table `rating` (User (Jury) ratings for movies)
--
INSERT INTO `rating` (`user_id`, `movie_id`, `score_creativity`, `score_technical`, `score_message`, `comment`, `score_total`, `created_at`) VALUES
(2, 1, 8, 9, 7, 'Concept très original et visuellement impressionnant. L''IA est utilisée à bon escient.', 8.0, NOW()),
(2, 3, 9, 8, 9, 'Une histoire touchante et une animation fluide. Un futur grand nom du cinéma d''animation.', 8.6, NOW()),
(2, 4, 7, 7, 8, 'Très belle exploration thématique, l''exécution visuelle est innovante mais parfois inégale.', 7.3, NOW());

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS=1;