import path from 'path';
import { fileURLToPath } from 'url';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';

export const entorno = {
  MODE: process.argv[2],
};

if (process.argv[2] != 'DEV' && process.argv[2] != 'PROD') {
  process.exit();
}

dotenv.config({
  path: process.argv[2] === 'DEV' ? './.env.development' : './.env.production',
});

entorno.PERSISTENCE = process.env.PERSISTENCE;
entorno.PORT = process.env.PORT;
entorno.MONGO_URL = process.env.MONGO_URL;
entorno.GITHUB_PASSPORT_CLIENT_ID = process.env.GITHUB_PASSPORT_CLIENT_ID;
entorno.GITHUB_PASSPORT_CLIENT_SECRET = process.env.GITHUB_PASSPORT_CLIENT_SECRET;
entorno.GITHUB_PASSPORT_CALLBACK_URL = process.env.GITHUB_PASSPORT_CALLBACK_URL;
entorno.API_URL = process.env.API_URL;
entorno.GOOGLE_EMAIL = process.env.GOOGLE_EMAIL;
entorno.GOOGLE_PASS = process.env.GOOGLE_PASS;