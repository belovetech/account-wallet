import { loadEnvFile } from 'node:process';

try {
  loadEnvFile(process.cwd() + '/.env');
} catch (error) {
  console.log('Unable to load environment variable');
}

export const config = {
  port: process.env.PORT || 4000,
};
