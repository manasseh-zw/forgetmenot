import type { APIRoute } from 'astro';
import { queryDb } from '../../../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ params }) => {
  try {
    const result = await queryDb(`
      UPDATE notes 
      SET likes = likes + 1 
      WHERE id = ? 
      RETURNING *
    `, [params.id]);
    
    if (!result.rows.length) {
      return new Response(JSON.stringify({ error: 'Note not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update like' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}; 