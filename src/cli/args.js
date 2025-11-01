const parseArgs = () => {
  // Write your code here
  const args = process.argv.slice(2);

  if(args.length === 0){
    return console.log("No arguments");
  }
  
  const result = [];

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    const value = args[i + 1];

    if (key.startsWith('--')) {
      const propName = key.slice(2);
      result.push(`${propName} is ${value}`);
    }
  }
  console.log(result.join(', '));
};

parseArgs();
