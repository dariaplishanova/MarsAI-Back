import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AppError } from './types/type.js';
import { Pool, PoolConnection, ResultSetHeader } from 'mysql2/promise';

type DBValue = string | number | boolean | Date | null;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sendError = (message: string, codeStatus: number = 400) => {
  const error = new Error(message) as AppError;
  error.status = codeStatus;
  throw error;
};

export const s = (len: number) => (len > 1 ? 's' : '');

export const insertEntity = async <T extends object>(
  tableName: string,
  data: T,
  allowedColumns: (keyof T)[],
  db: Pool | PoolConnection,
  options: { hasTimestamp?: boolean } = { hasTimestamp: true },
): Promise<ResultSetHeader> => {
  const columns = allowedColumns.filter((col) => data[col] !== undefined);

  let columnNames = columns.map((col) => `\`${String(col)}\``).join(', ');
  let placeholders = columns.map(() => '?').join(', ');

  if (options.hasTimestamp) {
    columnNames += ', created_at, updated_at';
    placeholders += ', NOW(), NOW()';
  } else {
    columnNames += ', created_at';
    placeholders += ', NOW()';
  }

  const query = `INSERT INTO \`${tableName}\` (${columnNames}) VALUES (${placeholders})`;

  const values: DBValue[] = columns.map((col) => {
    const val = data[col];

    if (typeof val === 'string' && /^\d{4}-/.test(val) && val.includes('T')) {
      return val.replace('T', ' ').split('.')[0];
    }

    return (val === undefined ? null : val) as DBValue;
  });

  const [result] = await db.execute<ResultSetHeader>(query, values);
  return result;
};

export const updateEntity = async <T extends object>(
  tableName: string,
  id: number,
  data: Partial<T>,
  allowedColumns: (keyof T)[],
  db: Pool,
): Promise<ResultSetHeader> => {
  const columns = allowedColumns.filter((col) => data[col] !== undefined);

  if (columns.length === 0) {
    throw new Error('Aucune donnée valide à mettre à jour.');
  }

  const setClause = columns.map((col) => `\`${String(col)}\` = ?`).join(', ');
  const query = `UPDATE \`${tableName}\` SET ${setClause}, updated_at = NOW() WHERE id = ?`;

  const values: DBValue[] = columns.map((col) => {
    const val = data[col];
    if (typeof val === 'string' && /^\d{4}-/.test(val) && val.includes('T')) {
      return val.replace('T', ' ').split('.')[0];
    }
    return (val === undefined ? null : val) as DBValue;
  });

  const [result] = await db.execute<ResultSetHeader>(query, [...values, id]);
  return result;
};
