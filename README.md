Test site for tire repair
## Demo
You can check the work [heroku](https://shop-repair.herokuapp.com/)

## Getting Started SQLite
Add .env.local
```
DATABASE_URL="file:./dev.db"
DATABASE_TYPE="sqlite"
API_HOST=http://localhost:3000/api

```
Change prisma/schema.prisma field:  provider = "sqlite"

Install dependencies
```bash
npm install
#or
yarn install
```
Creating a database. Used Sqlite c orm prisma

```bash
npx prisma migrate dev
```
View data in the database

```bash
npx prisma studio
```

## Getting Started postgresql

Add .env.local
```
DATABASE_URL=postgresql://postgres:....
DATABASE_TYPE="postgresql"
API_HOST=http://localhost:3000/api

```

Install dotenv
```
npm install -g dotenv-cli

```
Start migrate
```
dotenv -e .env.local -- npx prisma migrate dev --name init

```
Create data in table
```
dotenv -e .env.local -- npx prisma db seed

```

Work with this database was carried out was carried out [supabase](https://supabase.com/)

## Getting Started Develop

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Sending to the repository

```
npm run prettier:write
npm run prettier:check

git add .
git commit -m"TASK_ID: TASK_MSG"
git pull origin dev
git push

```
Deploy occurs in heroku automatically after updating the main branch

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Need to fix

1.issue errors on the server via middleware