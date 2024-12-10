import { createClient } from '@libsql/client';

export const db = createClient({
  url: import.meta.env.TURSO_DB_URL,
  authToken: import.meta.env.TURSO_DB_AUTH_TOKEN,
});

export async function queryDb(sql: string, params: any[] = []) {
  try {
    const result = await db.execute({ sql, args: params });
    return result;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
} 