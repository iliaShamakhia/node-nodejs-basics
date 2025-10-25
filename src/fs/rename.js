import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
  // Write your code here
  const dirName = path.dirname(fileURLToPath(import.meta.url));
  const wrongFilePath = path.join(dirName, 'files', 'wrongFilename.txt');
  const properFilePath = path.join(dirName, 'files', 'properFilename.md');

  let properFileHandle;

  try{
    properFileHandle = await fs.open(properFilePath, 'r');
    throw new Error("FS operation failed");
  }catch(e){
    if(e.code === 'ENOENT'){
      try{
        await fs.rename(wrongFilePath, properFilePath);
      }catch(err){
        throw new Error("FS operation failed");
      }
    }else{
      throw e;
    }
  }finally{
    await properFileHandle?.close();
  }
};

await rename();
