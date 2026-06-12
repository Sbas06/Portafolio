import { defineMiddleware } from 'astro:middleware';
import { validateSession } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = context.cookies.get('session')?.value;

    if (!token) {
      return context.redirect('/admin/login');
    }

    const kv = context.locals.runtime?.env?.PORTFOLIO_KV;
    if (kv) {
      const valid = await validateSession(kv, token);
      if (!valid) {
        context.cookies.delete('session', { path: '/' });
        return context.redirect('/admin/login');
      }
    }
    // In dev (no KV), allow access if cookie exists
  }

  return next();
});
