import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AppError } from './types/type.js';
import { Pool, ResultSetHeader } from 'mysql2/promise';

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
  db: Pool,
  options: { hasTimestamp?: boolean } = { hasTimestamp: true }, // Option par défaut
): Promise<ResultSetHeader> => {
  const columns = allowedColumns.filter((col) => data[col] !== undefined);

  // On prépare les colonnes de base
  let columnNames = columns.join(', ');
  let placeholders = columns.map(() => '?').join(', ');

  // Si l'option hasTimestamp est vraie, on ajoute les colonnes auto
  if (options.hasTimestamp) {
    columnNames += ', created_at, updated_at';
    placeholders += ', NOW(), NOW()';
  } else {
    columnNames += ', created_at';
    placeholders += ', NOW()';
  }

  const query = `INSERT INTO \`${tableName}\` (${columnNames}) VALUES (${placeholders})`;

  const values = columns.map((col) => {
    const val = data[col];

    // Nettoyage des dates ISO pour MySQL (ex: 2026-02-25T20:00:00.000Z -> 2026-02-25 20:00:00)
    if (typeof val === 'string' && /^\d{4}-/.test(val) && val.includes('T')) {
      return val.replace('T', ' ').split('.')[0];
    }

    return val === undefined ? null : val;
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
  // On filtre les colonnes présentes dans data et autorisées
  const columns = allowedColumns.filter((col) => data[col] !== undefined);

  if (columns.length === 0) {
    throw new Error('Aucune donnée valide à mettre à jour.');
  }

  // Construction de la clause SET sécurisée avec des backticks
  const setClause = columns.map((col) => `\`${String(col)}\` = ?`).join(', ');

  const query = `
    UPDATE \`${tableName}\` 
    SET ${setClause}, updated_at = NOW() 
    WHERE id = ?
  `;

  // Extraction des valeurs sans 'any'
  const values = columns.map((col) => {
    const val = data[col]; // TypeScript accepte cela car col est keyof T

    // Nettoyage des dates ISO pour MySQL
    if (typeof val === 'string' && /^\d{4}-/.test(val) && val.includes('T')) {
      return val.replace('T', ' ').split('.')[0];
    }

    // MySQL ne comprend pas undefined, on force null
    return val === undefined ? null : val;
  });

  // Exécution avec l'ID à la fin pour le WHERE
  const [result] = await db.execute<ResultSetHeader>(query, [...values, id]);
  return result;
};
