import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

function main() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('Created data directory.');
  } else {
    console.log('Data directory already exists.');
  }
}

main();
