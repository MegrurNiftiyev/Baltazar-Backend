import fs from 'fs';

let txt = fs.readFileSync('response.md', 'utf8');
if (txt.includes('\0')) {
  txt = fs.readFileSync('response.md', 'utf16le');
}

const lines = txt.split('\n');
const errors: string[] = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]!;
  if (
    line.includes('WARN:') ||
    line.includes('ERROR:') ||
    line.includes('❌') ||
    line.includes('statusCode": 4') ||
    line.includes('statusCode": 5') ||
    line.includes('"statusCode": 4') ||
    line.includes('"statusCode": 5')
  ) {
    errors.push(`Line ${i + 1}: ${line.trim()}`);
  }
}

console.log(`Total error/warning lines found: ${errors.length}`);
errors.forEach((e) => console.log(e));
