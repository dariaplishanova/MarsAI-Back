import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

interface MySQLError extends Error {
  code?: string;
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const testDbConnection = async (): Promise<void> => {
  try {
    const connection = await pool.getConnection(); // On demande une ligne au standard
    console.log('✅ Connexion au Pool MySQL réussie');
    connection.release(); // On libère la ligne immédiatement
  } catch (error: unknown) {
    console.error("❌ Impossible de joindre la base de données via le Pool :");

    if (error instanceof Error) {
      const mysqlError = error as MySQLError;
      if (mysqlError.code === 'ENOTFOUND') {
        console.error("Hôte introuvable. Vérifiez DB_HOST dans le .env");
      } else if (mysqlError.code === 'ER_ACCESS_DENIED_ERROR') {
        console.error("Accès refusé. Vérifiez DB_USER et DB_PASSWORD");
      } else if (mysqlError.code === 'ECONNREFUSED') {
        console.error("Connexion refusée. Le serveur MySQL est-il lancé ?");
      } else {
        console.error(`Erreur : ${mysqlError.message}`);
      }
    }
    process.exit(1);
  }
};

export default pool;