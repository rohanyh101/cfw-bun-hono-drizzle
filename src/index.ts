import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { posts } from "./db/schema";
import { eq } from "drizzle-orm";

export type Env = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => {
	return c.json("HI MOM!");
});

app.get("/posts", async (c) => {
	const db = drizzle(c.env.DB);

	const result = await db
		.select({ TITLE: posts.title, CONTENT: posts.content })
		.from(posts)
		.all();

	c.status(200);
	return c.json(result);
});

app.post("/posts", async (c) => {
	const db = drizzle(c.env.DB);
	const { title, content } = await c.req.json();

	const result = await db
		.insert(posts)
		.values({ title, content })
		.returning({ id: posts.id });

	return c.json(result);
});

app.delete("/posts/:user_id", async (c) => {
	const db = drizzle(c.env.DB);
	const { user_id } = c.req.param();

	const id = Number.parseInt(user_id, 10);
	const result = await db
		.delete(posts)
		.where(eq(posts.id, id))
		.returning({ id: posts.id });

	return c.json(result);
});

app.put("/posts/:user_id", async (c) => {
	const db = drizzle(c.env.DB);
	const { user_id } = c.req.param();
	const { title, content } = await c.req.json();

	const id = Number.parseInt(user_id, 10);
	const result = await db
		.update(posts)
		.set({ title, content })
		.where(eq(posts.id, id))
		.returning({
			id: posts.id,
		});

    return c.json(result);
});

export default app;
