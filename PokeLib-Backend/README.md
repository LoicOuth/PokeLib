# Getting start

Install dependencies :

```bash
npm install
```

Create .env env file from .env.example and fill it with your environment variable

Execute migration :

```bash
npx prisma migrate dev --schema=./src/infrastructure/persistence/schema.prisma --name init
```

Run project :

```bash
npm run start:dev
```
