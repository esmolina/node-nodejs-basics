import { createReadStream } from 'node:fs';
import { stdout } from 'node:process'
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
const outputChannel = stdout;
const errorMessage = 'Something wrong';

const read = async () => {
  const readStream = createReadStream(filePath);
  readStream.on('data', (fileContent) => {
    outputChannel.write(`${fileContent}\n`);
  });

  readStream.on('error', (error) => {
    outputChannel.write(errorMessage);
  });
};

await read();