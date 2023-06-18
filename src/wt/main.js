import { cpus } from 'node:os';
import { Worker } from 'node:worker_threads';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerFilePath = path.join(__dirname, 'worker.js');

const performCalculations = async () => {
  const numberOfCores = cpus().length;
  const resultsObject = {};

  for (let i = 0; i < numberOfCores; i++) {
    const data = 10 + i;
    const worker = new Worker(workerFilePath, {workerData: { data }});

    worker.on('message', msg => {
      resultsObject[i] = { status: 'resolved', data: msg };
      if (Object.keys(resultsObject).length === numberOfCores) {
        const resultsArray = [];
        for (let j = 0; j < numberOfCores; j++) {
          resultsArray.push(resultsObject[j]);
        }
        console.log(resultsArray);
      }
    });

    worker.on('error', error => {
      resultsObject[i] = { status: 'error', data: null };
      if (Object.keys(resultsObject).length === numberOfCores) {
        const resultsArray = [];
        for (let j = 0; j < numberOfCores; j++) {
          resultsArray.push(resultsObject[j]);
        }
        console.log(resultsArray);
      }
    });
  }
};

await performCalculations();