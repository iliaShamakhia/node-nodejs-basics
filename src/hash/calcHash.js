import { fileURLToPath } from 'url';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';

const calculateHash = async () => {
  // Write your code here
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(currentDir, 'files', 'fileToCalculateHashFor.txt');
  const hash = createHash('sha256');
  const stream = createReadStream(filePath);

  return new Promise((resolve, reject) => {
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => {
      const digest = hash.digest('hex');
      console.log(`SHA256 hash: ${digest}`);
      resolve(digest);
    });
    stream.on('error', err => {
      console.error('Error reading file:', err.message);
      reject(err);
    });
  });
};

await calculateHash();
