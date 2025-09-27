import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

interface Config {
  port: string | number;
  database_url: string;
  cloudinary: {
    cloud_name: string;
    api_key: string;
    api_secret: string;
  };
  jwt_secret: string;
}

const config: Config = {
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL || "",
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
    api_key: process.env.CLOUDINARY_API_KEY || "",
    api_secret: process.env.CLOUDINARY_API_SECRET || "",
  },
  jwt_secret: process.env.JWT_SECRET || "defaultsecret",
};

export default config;