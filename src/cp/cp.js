import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'url';

const spawnChildProcess = async (args) => {
  // Write your code here
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const scriptPath = path.join(currentDir, 'files', 'script.js');

  const child = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit'] // stdin and stdout piped, stderr inherited
  });

  process.stdin.pipe(child.stdin);

  child.stdout.pipe(process.stdout);

  child.on('error', (err) => {
    console.error('Failed to start child process:', err.message);
  });

  child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2']);
