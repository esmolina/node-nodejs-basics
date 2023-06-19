import { stat, unlink} from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');
const errorMessage = 'FS operation failed';


const remove = async () => {
  try {
    await stat(filePath);
    throw new Error();
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    } else {
      unlink(filePath);
    }
  }
};

await remove();