import { spawn } from 'node:child_process';
import { dirname } from 'node:path';
import { stdin as mainStdin, stdout as mainStdout} from 'node:process';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const scriptFilePath = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const childProcess = spawn('node', [scriptFilePath, ...args], {
    stdio: [mainStdin, 'pipe', mainStdout]
  });

  childProcess.stdout.pipe(mainStdout);
};

spawnChildProcess(  [ 'hello', 'dear', 'friend'] );
