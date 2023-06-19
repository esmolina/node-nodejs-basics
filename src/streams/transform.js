import { stdin, stdout } from 'node:process';
import { Transform} from 'node:stream'

const inputChannel = stdin;
const outputChannel = stdout;

const transform = async () => {
  const transformer = new Transform({
    objectMode: true,
    readableObjectMode: true,
    writableObjectMode: true,
    transform: function (chunk, encoding, callback) {
      const reversedChunk = chunk.toString().split('').reverse().join('');
      callback(null, reversedChunk);
    }
  });

  inputChannel.pipe(transformer).pipe(outputChannel);
};

await transform();