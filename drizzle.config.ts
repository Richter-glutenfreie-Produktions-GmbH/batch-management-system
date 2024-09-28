import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/db/schema/*",
    out: "./supabase/migrations",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    breakpoints: false,
});
