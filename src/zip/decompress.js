import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'url';

const decompress = async () => {
  // Write your code here
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const sourcePath = path.join(currentDir, 'files', 'archive.gz');
  const destinationPath = path.join(currentDir, 'files', 'fileToCompress.txt');
  
  const readableStream = createReadStream(sourcePath);
  const gunzipStream = createGunzip();
  const writableStream = createWriteStream(destinationPath);

  readableStream.pipe(gunzipStream).pipe(writableStream);

  readableStream.on('finish', () => {
    console.log('File has been decompressed to fileToCompress.txt');
  });

  readableStream.on('error', err => {
    console.error('Decompression failed:', err.message);
  });
};

await decompress();
