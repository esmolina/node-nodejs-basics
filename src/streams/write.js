import { createWriteStream } from 'node:fs';
import { stdin, stdout } from 'node:process'
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const writableFilePath = path.join(__dirname, 'files', 'fileToWrite.txt');
const inputChannel = stdin;
const infoForUserChannel = stdout;
const writeStream = createWriteStream(writableFilePath);

const write = async () => {
  infoForUserChannel.write('Hello, my friend!\nWrite any text and I\'ll add it to fileToWrite.txt\nTo exit the input mode, press Ctrl+C (Cmd+C)\n \n>');
  inputChannel.on('data', enteredSymbols => {
    const content = `${enteredSymbols}`;
    writeStream.write(
      content,
      (err) => {
        if (err) {
          throw err
        }
      }
    )
  })
};

await write();