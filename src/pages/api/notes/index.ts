import type { APIRoute } from 'astro';
import { queryDb } from '../../../lib/db';
import type { CreateNoteInput } from '../../../types/db';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
    try {
        const searchParams = new URL(url).searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const offset = (page - 1) * limit;

        const result = await queryDb(`
      SELECT * FROM notes 
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

        return new Response(JSON.stringify(result.rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch notes' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body: CreateNoteInput = await request.json();

        const result = await queryDb(`
      INSERT INTO notes (text, author, created_at, likes)
      VALUES (?, ?, datetime('now'), 0)
      RETURNING *
    `, [body.text, body.author || 'Anonymous']);

        console.log(result);

        return new Response(JSON.stringify(result.rows[0]), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Failed to create note' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}; 