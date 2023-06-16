import { stat, writeFile } from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fresh.txt');
const content = 'I am fresh and young';
const errorMessage = 'FS operation failed';

const create = async () => {
  try {
    await stat(filePath);
    throw new Error();
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeFile(filePath, content);
    } else {
      throw new Error(errorMessage);
    }
  }
};

await create();