import type { NextRequest } from 'next/server';
import { API_ROOT, TOKEN_COOKIE } from '@/lib/config';

// Same-origin proxy to the LWT API for client components: /api/text?page=1 -> {API_ROOT}/text?page=1.
// The JWT stays in an httpOnly cookie and is attached here, so the browser never sees it.
async function forward(req: NextRequest, ctx: RouteContext<'/api/[...path]'>) {
  const { path } = await ctx.params;
  const url = `${API_ROOT}/${path.map(encodeURIComponent).join('/')}${req.nextUrl.search}`;
  const token = req.cookies.get(TOKEN_COOKIE)?.value;
  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';

  const res = await fetch(url, {
    method: req.method,
    headers: {
      'Content-Type': req.headers.get('content-type') ?? 'application/json',
      ...(token ? { Authorization: `bearer ${token}` } : {}),
    },
    body: hasBody ? await req.text() : undefined,
    cache: 'no-store',
  });

  return new Response(res.body, {
    status: res.status,
    headers: { 'Content-Type': res.headers.get('content-type') ?? 'application/json' },
  });
}

export { forward as GET, forward as POST, forward as PUT, forward as PATCH, forward as DELETE };
