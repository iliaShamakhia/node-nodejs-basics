import { cpus } from 'node:os';
import { Worker } from 'node:worker_threads';
import path from 'node:path';
import { fileURLToPath } from 'url';

const performCalculations = async () => {
  // Write your code here
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const workerPath = path.join(currentDir, 'worker.js');
  const numCores = cpus().length;
 
  const workerPromises = Array.from({ length: numCores }, (_, i) => {
    return new Promise((resolve) => {
      const worker = new Worker(workerPath, { type: 'module' });

      worker.postMessage(10 + i);

      worker.on('message', (message) => {
        resolve(message);
      });

      worker.on('error', () => {
        resolve({ status: 'error', data: null });
      });
    });
  });

  const finalResults = await Promise.all(workerPromises);
  console.log(finalResults);
};

await performCalculations();
