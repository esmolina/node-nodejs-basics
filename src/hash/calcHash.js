import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
  const data = createReadStream(filePath);
  const hash = createHash('sha256');
  data.pipe(hash).setEncoding('hex').on('data', (chunk) => {
    console.log(chunk);
  });
};

await calculateHash();