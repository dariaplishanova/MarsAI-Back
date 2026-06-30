import mysql from 'mysql2/promise';
import logger from './logger.js';

interface MySQLError extends Error {
  code?: string;
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: { rejectUnauthorized: false },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const maxRetries = 10;

export const testDbConnection = async (attempt = 1): Promise<void> => {
  try {
    await pool.getConnection();
    logger.info("DB connected");
  } catch (err) {
    if (attempt >= maxRetries) {
      logger.error("DB connection failed after max retries");
      throw err;
    }

    logger.warn(`DB not ready, retrying (${attempt}/${maxRetries})...`);
    await new Promise(r => setTimeout(r, 3000));

    return testDbConnection(attempt + 1);
  }
};

export default pool;
