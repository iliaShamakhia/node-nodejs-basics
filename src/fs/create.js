import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
  // Write your code here
  const dirName = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(dirName, 'files', 'fresh.txt');
  
  let fileHandle;

  try{
    fileHandle = await fs.open(filePath, 'r');
    throw new Error("FS operation failed");
  }catch(e){
    if(e.code === 'ENOENT'){
      fileHandle = await fs.open(filePath, 'w');
      await fileHandle.write("I am fresh and young");
    }else{
      throw e;
    }
  }finally{
    await fileHandle?.close();
  }
};

await create();
