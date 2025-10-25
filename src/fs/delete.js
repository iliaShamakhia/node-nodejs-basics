import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
  // Write your code here
  const dirName = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(dirName, 'files', 'fileToRemove.txt');

  try{
    await fs.unlink(filePath);
  }catch(e){
    throw new Error("FS operation failed");
  }
};

await remove();
