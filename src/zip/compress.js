import { createGzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compressedFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
const archivePath = path.join(__dirname, 'files', 'archive.gz');

const compress = async () => {
  const readStream = createReadStream(compressedFilePath);
  const writeStream = createWriteStream(archivePath);
  const gzipStream = createGzip();

  readStream.pipe(gzipStream).pipe(writeStream);
};

await compress();