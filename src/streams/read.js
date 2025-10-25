import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const read = async () => {
  // Write your code here
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(currentDir, 'files', 'fileToRead.txt');
  const stream = createReadStream(filePath);

  stream.pipe(process.stdout);

  stream.on('error', err => {
    console.error('Error reading file:', err.message);
  });
};

await read();
