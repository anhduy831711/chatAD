import * as dotenv from 'dotenv';
import * as path from 'path';

const env = process.env.NODE_ENV || 'dev';

const configFilePath = path.join(__dirname, `/env/${env}.env`);
dotenv.config({ path: configFilePath });