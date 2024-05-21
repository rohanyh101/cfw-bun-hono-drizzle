Cloudflare workers bun hono.js drizzle-orm d1 database

before running this project, must have a Cloudflare account,
Also setup the `d1` database alongside, 
there are two ways to do this,
1. Via Cloudflare dashboard UI
2. Via Wrangler CLI tool

The way I did here using Wrangler CLI,
```powershell
 bunx wrangler d1 create cfw-bun-hono-drizzle-d1
 bunx wrangler d1 execute cfw-bun-hono-drizzle-d1 --local --file=./drizzle/migrations/0000_safe_sumo.sql
 bunx wrangler d1 execute cfw-bun-hono-drizzle-d1 --remote --file=./drizzle/migrations/0000_safe_sumo.sql

```

RUN INSTRUCTIONS,
1. Clone directory
2. Then, follow the commands given below,
3. Then, your project will start running on your preferred environment `dev` or `remote` 

- Run project in locally,
```
npm install
npm run dev
```
- Run project remotely,
```
npm run deploy
```

SOME CURL COMMANDS TO EXECUTE,
```powershell
curl --location --request DELETE 'https://cfw-bun-hono-drizzle.tempoonlyacc.workers.dev/posts/3' `
>> --header 'Content-Type: application/json'
[{"id":3}]


curl --location --request GET 'https://cfw-bun-hono-drizzle.tempoonlyacc.workers.dev/posts' `
>> --header 'Content-Type: application/json'
[{"TITLE":"HI","CONTENT":"MOM!!!"},{"TITLE":"rohan","CONTENT":"yh"}]


curl --location --request POST 'https://cfw-bun-hono-drizzle.tempoonlyacc.workers.dev/posts' `
>> --header 'Content-Type: application/json' `
>> --data-raw '{ "title": "sakshi", "content": "k" }'
[{"id":4}]


curl --location --request POST 'https://cfw-bun-hono-drizzle.tempoonlyacc.workers.dev/posts' `
>> --header 'Content-Type: application/json' `
>> --data-raw '{ "title": "manoj", "content": "g" }'
[{"id":5}]


curl --location --request GET 'https://cfw-bun-hono-drizzle.tempoonlyacc.workers.dev/posts' `
>> --header 'Content-Type: application/json'
[{"TITLE":"HI","CONTENT":"MOM!!!"},{"TITLE":"rohan","CONTENT":"yh"},{"TITLE":"sakshi","CONTENT":"k"}]


curl --location --request PUT 'https://cfw-bun-hono-drizzle.tempoonlyacc.workers.dev/posts/5' `
>> --header 'Content-Type: application/json' `
>> --data-raw '{ "title": "mahal" }'
[{"id":5}]


curl --location --request GET 'https://cfw-bun-hono-drizzle.tempoonlyacc.workers.dev/posts' `
>> --header 'Content-Type: application/json'
[{"TITLE":"HI","CONTENT":"MOM!!!"},{"TITLE":"rohan","CONTENT":"yh"},{"TITLE":"sakshi","CONTENT":"k"}]
```
