# Migration from the CRA app

Old code: `master` branch, `src/Components/Pages/*`.

| Old route | Page | Status |
| --- | --- | --- |
| `/login`, `/register` | LoginPage, RegisterPage | Ported (server actions, httpOnly cookie) |
| `/` | HomePage (last read text) | Stub |
| `/text` | TextPage (list, filter, create, edit, delete) | Stub |
| `/text/read/:textId` | TextReadPage (term highlighting, term edit, bookmark, dictionary) | Stub |
| `/statistics` | StatisticsPage (Victory charts) | Stub |
| `/profile` | UserPage (language settings) | Stub |

Not carried over: Redux (replaced by server components + TanStack Query where client state is needed),
react-router, react-helmet (Next metadata), Sentry v5, the nginx Docker image and Azure workflow (deploy target to be decided).
