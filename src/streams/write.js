import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const write = async () => {
  // Write your code here
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(currentDir, 'files', 'fileToWrite.txt');
  const writableStream = createWriteStream(filePath);

  process.stdin.pipe(writableStream);

  process.stdin.setEncoding('utf8');

  process.stdin.on('data', chunk => {
    if (chunk.trim() === 'exit') {
      process.stdin.unpipe(writableStream);
      writableStream.end();
    }
  });

  writableStream.on('finish', () => {
    console.log('Data has been written to fileToWrite.txt');
  });

  writableStream.on('error', err => {
    console.error('Error writing to file:', err.message);
  });

  console.log("type 'exit' and press Enter to finish");
};

await write();
