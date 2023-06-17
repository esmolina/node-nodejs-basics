import { stat, readdir } from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const folderPath = path.join(__dirname, 'files');
const errorMessage = 'FS operation failed';

const list = async () => {
  try {
    await stat(folderPath);
    throw new Error(errorMessage);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    }
  }

  const folderContent = await readdir(folderPath, { withFileTypes: true });
  const namesArray = [];

  folderContent.map(folderElement => {
    namesArray.push(folderElement.name);
  })

  console.log(namesArray);
};

await list();