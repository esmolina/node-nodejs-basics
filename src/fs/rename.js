import { stat, rename as renamePromise } from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const wrongFilePath = path.join(__dirname, 'files', 'wrongFilename.txt');
const rightFilePath = path.join(__dirname, 'files', 'properFilename.md');
const errorMessage = 'FS operation failed';

const rename = async () => {
  try {
    await stat(wrongFilePath);
    throw new Error();
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    }
  }

  try {
    await stat(rightFilePath);
    throw new Error();
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw new Error(errorMessage);
    }
  }

    await renamePromise(wrongFilePath, rightFilePath);
};

await rename();