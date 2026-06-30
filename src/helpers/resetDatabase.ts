import pool from "../config/database.js"; // Adjust path to match your DB config import

export const resetDatabase = async (): Promise<void> => {
  // 1. Temporarily turn off foreign key constraints
  // This allows you to empty tables without SQL errors [cite: 372, 373]
  await pool.query("SET FOREIGN_KEY_CHECKS = 0");

  // 2. Clear out the tables completely [cite: 372]
  await pool.query("TRUNCATE TABLE movie");
  await pool.query("TRUNCATE TABLE director");

  // 3. Turn safety checks back on [cite: 379, 380]
  await pool.query("SET FOREIGN_KEY_CHECKS = 1");

  // 4. Seed 1 default Director record
  // This gives us a valid ID to link our movies to
  await pool.query(`
    INSERT INTO director (id, firstname, lastname, gender, birthday, email, country) 
    VALUES (1, 'Christopher', 'Nolan', 'Male', '1970-07-30 00:00:00', 'nolan@example.com', 'UK')
  `);

  // 5. Seed default movies with different statuses [cite: 396]
  // This lets us test that your public route ONLY returns 'approved' movies
  await pool.query(`
    INSERT INTO movie (id, title, synopsis, duration, language, video_url, thumbnail, stack, ia_type, status, director_id) 
    VALUES 
    (1, 'Interstellar', 'A journey through a wormhole...', 169, 'English', 'https://video.com/1', 'thumb1.jpg', 'Python, Blender', 'Hybride', 'approved', 1),
    (2, 'Inception', 'A thief who steals corporate secrets through dream-sharing...', 148, 'English', 'https://video.com/2', 'thumb2.jpg', 'Node, StableDiffusion', '100% IA', 'in_review', 1)
  `);
};