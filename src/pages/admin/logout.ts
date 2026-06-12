import type { APIRoute } from 'astro';
import { deleteSession } from '../../lib/auth';

export const POST: APIRoute = async ({ cookies, locals, redirect }) => {
  const token = cookies.get('session')?.value;
  if (token) {
    const kv = locals.runtime?.env?.PORTFOLIO_KV;
    if (kv) await deleteSession(kv, token);
  }
  cookies.delete('session', { path: '/' });
  return redirect('/admin/login');
};
