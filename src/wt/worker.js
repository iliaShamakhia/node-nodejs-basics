import { parentPort } from 'node:worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

parentPort.on('message', (n) => {
  sendResult(n);
});

const sendResult = (n) => {
  // This function sends result of nthFibonacci computations to main thread
  try {
    let result = nthFibonacci(n);
    parentPort.postMessage({ status: 'resolved', data: result });
  } catch (error) {
    parentPort.postMessage({ status: 'error', data: null });
  }
};

//sendResult(); commented this line because it runs before the 'message' event from parent fires, so it sends result 0 back to parent.
