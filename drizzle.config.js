/** @type {import("drizzle-kit").Config} */
export default ({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials: {
    url:'postgresql://neondb_owner:npg_ts9uxRd1WAaS@ep-gentle-dust-ad7kneki-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  },
});