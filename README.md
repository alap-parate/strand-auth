# strand-auth

NestJS-based authentication service (Multi SSO, OIDC, users, tenants).

## Stack

- **Runtime:** Node.js
- **Framework:** [NestJS](https://nestjs.com) 11
- **Language:** TypeScript 5.x

## Project structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
├── modules/                # Feature modules (@modules/*)
│   ├── auth/
│   ├── oidc/
│   ├── tenants/
│   └── users/
└── infra/                  # Shared infrastructure (@infra/*)
    ├── cache/
    ├── config/
    ├── db/
    └── queue/
```

Path aliases (see `tsconfig.json`):

- `@modules/*` → `src/modules/*`
- `@infra/*` → `src/infra/*`
- `@/shared/*` → `src/shared/*`
- `@constants/*` → `src/constants/*`

## Setup

```bash
npm install
```

## Scripts

| Command | Description |
|--------|-------------|
| `npm run start` | Run once |
| `npm run start:dev` | Run in watch mode |
| `npm run start:debug` | Run with debug (watch) |
| `npm run start:prod` | Run production build (`node dist/main`) |
| `npm run build` | Compile to `dist/` |
| `npm run test` | Unit tests |
| `npm run test:e2e` | E2E tests |
| `npm run test:cov` | Unit tests with coverage |
| `npm run lint` | ESLint (with fix) |
| `npm run format` | Prettier (src + test) |

## Resources

- [NestJS docs](https://docs.nestjs.com)
- [NestJS deployment](https://docs.nestjs.com/deployment)

## License

UNLICENSED (private).
