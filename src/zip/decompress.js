import { createUnzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const unCompressedFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
const archivePath = path.join(__dirname, 'files', 'archive.gz');

const decompress = async () => {
  const readStream = createReadStream(archivePath);
  const writeStream = createWriteStream(unCompressedFilePath);
  const unzipStream = createUnzip();

  readStream.pipe(unzipStream).pipe(writeStream);
};

await decompress();