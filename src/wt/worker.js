import { parentPort, workerData } from 'node:worker_threads';

const nthFibonacci = (n) => {
  return n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);
}

const sendResult = () => {
    // This function sends result of nthFibonacci computations to main thread
  const n = workerData;
  const nthFibonacciVar = n.data;

  const infoForMainThread = nthFibonacci(nthFibonacciVar);
  if (parentPort) {
    parentPort.postMessage(infoForMainThread);
  }
};

sendResult();