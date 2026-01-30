import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import type { QueryError } from 'mysql2';

dotenv.config();

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306, // TS demande un nombre ici
});

// Typage de l'argument 'error'
console.log('Connexion à la base de donnée réussi ✅'); 

export default connection;