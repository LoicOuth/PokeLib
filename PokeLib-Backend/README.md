# Getting start

Install dependencies :

```bash
npm install
```

Create .env env file from .env.example and fill it with your environment variable

Execute migration :

```bash
npx prisma migrate dev
```

Run project :

```bash
npm run start:dev
```

Create a new migration :

```bash
npx prisma migrate dev --name init
```

Reset database :

```bash
npx prisma migrate reset
```
