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
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const testDbConnection = async (): Promise<void> => {
  try {
    const connection = await pool.getConnection(); // Request a connection from the pool
    logger.info('Successfully connected to the MySQL Pool');
    connection.release(); // Release the connection immediately
  } catch (error: unknown) {
    logger.error('Unable to reach the database via the Pool:');

    if (error instanceof Error) {
      const mysqlError = error as MySQLError;
      if (mysqlError.code === 'ENOTFOUND') {
        logger.error('Host not found. Check DB_HOST in the .env file');
      } else if (mysqlError.code === 'ER_ACCESS_DENIED_ERROR') {
        logger.error('Access denied. Check DB_USER and DB_PASSWORD');
      } else if (mysqlError.code === 'ECONNREFUSED') {
        logger.error('Connection refused. Is the MySQL server running?');
      } else {
        logger.error(`Error: ${mysqlError.message}`);
      }
    }
    process.exit(1);
  }
};

export default pool;
