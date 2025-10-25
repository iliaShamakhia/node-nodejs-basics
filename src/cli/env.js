const parseEnv = () => {
  // Write your code here
  try {
    const rssVars = Object.entries(process.env)
      .filter(([key]) => key.startsWith('RSS_'))
      .map(([key, value]) => `${key}=${value}`);

    if (rssVars.length > 0) {
      console.log(rssVars.join('; '));
    } else {
      console.log('No RSS_ environment variables found.');
    }
  } catch (err) {
    console.error('Error reading environment variables:', err.message);
  }
};

parseEnv();
