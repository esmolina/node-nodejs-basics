import { stat, readFile } from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
// import {stdout} from 'node:process';

/* stdout - another option for output instead console.log, comments for learning */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
const errorMessage = 'FS operation failed';
// const outputChannel = stdout;

const read = async () => {
  try {
    await stat(filePath);
    throw new Error(errorMessage);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    } else {
      const fileContent = await readFile(filePath);
      console.log(fileContent.toString());
      // outputChannel.write(`${fileContent}\n`);
    }
  }

};

await read();