import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
  // Write your code here
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const sourceDir = path.join(currentDir, 'files');

  let filesDir;

  try{
    filesDir = await fs.readdir(sourceDir);
    console.log(filesDir)
  }catch(e){
    throw new Error("FS operation failed");
  }
};

/* let depth = "";//I use this variable to add space and '-' characters, to better show deeply nested folder structures.

const printFiles = async (src) => {

  console.log(depth + src.substring(src.lastIndexOf('\\')+1));

  let handle = await fs.opendir(src);
  for await (const child of handle) {
    const srcPath = path.join(src, child.name);

    if (child.isDirectory()) {
      depth += " ";
      await printFiles(srcPath);
      depth = depth.substring(0, depth.length - 1);
    } else if (child.isFile()) {
      depth += "-"
      console.log(depth + child.name);
      depth = depth.substring(0, depth.length - 1);
    }
  }
}; */

await list();
