import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'url';

const compress = async () => {
  // Write your code here
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const sourcePath = path.join(currentDir, 'files', 'fileToCompress.txt');
  const destinationPath = path.join(currentDir, 'files', 'archive.gz');

  const readableStream = createReadStream(sourcePath);
  const gzipStream = createGzip();
  const writableStream = createWriteStream(destinationPath);

  readableStream.pipe(gzipStream).pipe(writableStream);

  readableStream.on('finish', () => {
    console.log('File has been compressed to archive.gz');
  });
  
  readableStream.on('error', err => {
    console.error('Compression failed:', err.message);
  });
};

await compress();
