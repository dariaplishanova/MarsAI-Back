import mysql from 'mysql2'; // Import du type d'erreur
import dotenv from 'dotenv';
import type { QueryError } from 'mysql2';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306, // TS demande un nombre ici
});

// Typage de l'argument 'error'
connection.connect((error: QueryError | null) => {
  if (error) {
    console.error("❌ Erreur de connexion à MySQL:", error.message);
    return;
  }
  console.log("✅ Connecté à la base de données MySQL");
});

export default connection;