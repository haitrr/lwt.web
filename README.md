# lwt.web

Web UI for [lwt](https://github.com/haitrr/lwt), being rewritten in Next.js (App Router, TypeScript).
The previous Create React App version lives on `master`.

## Getting started

```shell
cp .env.example .env.local   # point LWT_API_ROOT at your lwt API
npm install
npm run dev
```

## How it talks to the API

- Login/register are server actions (`src/lib/auth.ts`). The JWT from `POST /api/user/login` is stored in an httpOnly cookie.
- Server components call the API with `apiFetch` (`src/lib/api.ts`), which forwards that token.
- Client components call same-origin `/api/*`, which `src/app/api/[...path]/route.ts` proxies to `LWT_API_ROOT` with the token attached.
- `src/proxy.ts` redirects signed-out visitors to `/login`.

See [MIGRATION.md](MIGRATION.md) for what has been ported.
