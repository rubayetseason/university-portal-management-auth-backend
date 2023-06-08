import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  database_user: process.env.DATABASE_USER,
  database_password: process.env.DATABASE_PASSWORD,
};
