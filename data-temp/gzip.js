import fs from 'fs';
import zlib from 'zlib';
const input = fs.createReadStream('data-temp/recipes.jsonl');
const output = fs.createWriteStream('data-temp/recipes.jsonl.gz');
input.pipe(zlib.createGzip({ level: 9 })).pipe(output).on('finish', () => {
  console.log('Wrote data-temp/recipes.jsonl.gz');
});
