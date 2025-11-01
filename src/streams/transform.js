import { Transform } from 'node:stream';

const transform = async () => {
  // Write your code here
 const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split('').reverse().join('');
      callback(null, reversed);
    }
  });

  process.stdin.setEncoding('utf8');
  process.stdin.pipe(reverseTransform).pipe(process.stdout);

  console.log("Type something. press Ctrl + C to finish.");
};

await transform();
