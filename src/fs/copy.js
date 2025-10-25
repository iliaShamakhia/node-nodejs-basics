import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
  // Write your code here
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const sourceDir = path.join(currentDir, 'files');
  const destinationDir = path.join(currentDir, 'files_copy');

  let filesDir;
  let filesCopyDir;

  try{
    filesDir = await fs.opendir(sourceDir);
  }catch(e){
    throw new Error("FS operation failed");
  }finally{
    await filesDir?.close();
  }

  try{
    filesCopyDir = await fs.opendir(destinationDir);
    throw new Error("FS operation failed");
  }catch(e){
    if(e.code === 'ENOENT'){
      await copyDirectory(sourceDir, destinationDir);
    }else{
      throw e;
    }
  }finally{
    await filesCopyDir?.close();
  }
};

const copyDirectory = async (src, dest) => {
  await fs.mkdir(dest);
  let handle = await fs.opendir(src);
  
  for await (const child of handle) {
    const srcPath = path.join(src, child.name);
    const destPath = path.join(dest, child.name);

    if (child.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else if (child.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

await copy();
