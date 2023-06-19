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


/* comment for cross-check
spawnChildProcess create child-process in spawn-method (node - is the command that runs the script, meaning node script.js)
stdio-option take info how data will be transferred between the parent process and child process (IPC (Inter-Process Communication))
stdio: [mainStdin, 'pipe', mainStdout] means that the input stream of the parent process (main Stdin)
will be the input stream of the child process, and the output stream of the child process will be the
output stream of the parent process (mainStdout)

child procces receive data from parent process in childProcess.stdout.pipe(mainStdout);
 */