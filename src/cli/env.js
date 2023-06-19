import { env } from 'node:process';

const parseEnv = () => {
  const envVariablesObject = env;

  Object.entries(envVariablesObject).forEach(([key, value]) => {
    if (key.startsWith('RSS_')) {
      console.log(`${key}=${value}`);
    }
  });
};

parseEnv();