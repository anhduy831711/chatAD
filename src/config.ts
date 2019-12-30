import * as dotenv from 'dotenv';
import * as path from 'path';

const env = process.env.NODE_ENV || 'dev';

try{
    const configFilePath = path.resolve('', process.cwd() + `/src/env/${env}.env`);
    
    dotenv.config({ path: configFilePath });
}catch(e){
    console.error(e);
}