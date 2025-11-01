import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  // Write your code here
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(currentDir, 'files', 'fileToRead.txt');

  let fileHandle;
  let stream;

  try{
    fileHandle = await fs.open(filePath, 'r');
    stream = fileHandle.createReadStream();
  }catch(e){
    throw new Error("FS operation failed");
  }

  stream.on('data', (chunk) => {
    console.log(chunk.toString());
  });

  stream.on('end', async () => {
    await fileHandle?.close();
  });
};

await read();
