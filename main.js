const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();

program
  .option('-i, --input <path>', 'Path to input file (required)')
  .option('-o, --output <path>', 'Path to output file (optional)')
  .option('-d, --display', 'Display the result in the console');

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error('Error: Please, specify input file');
  process.exit(1);
}

const inputPath = path.resolve(options.input);

try {
  if (!fs.existsSync(inputPath)) {
    console.error('Error: Cannot find input file');
    process.exit(1);
  }

  const data = fs.readFileSync(inputPath, 'utf-8');
  const parsedData = JSON.parse(data);

  const newData = parsedData
    .filter((item) => item.parent === 'BS3_BanksLiab')
    .map((item) => `${item.txten}:${item.value}`);

  const newjsonStr = JSON.stringify(newData, null, 2);

  if (options.output) {
    const outputPath = path.resolve(options.output);
    fs.writeFileSync(outputPath, newjsonStr, 'utf-8');
    console.log(`Result has been saved to ${outputPath}`);
  }

  if (options.display) {
    console.log('Result:', newjsonStr);
  }

} catch (err) {
  console.error('Error processing the file:', err.message);
  process.exit(1);
}
