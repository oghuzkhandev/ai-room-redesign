import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';


export default defineConfig({
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_g7L9asnHocuv@ep-holy-sunset-a2sbu8u3-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"
  },
});