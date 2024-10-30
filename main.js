const { program } = require('commander');
const fs = require('fs');

program
  .requiredOption('-i, --input <path>', 'Path to the input .json file')
  .option('-o, --output <path>', 'Path to the output file')
  .option('-d, --display', 'Display the output in the console');

program.parse(process.argv);
const options = program.opts();

// Check if the input file exists
if (!options.input) {
  console.error("Please, specify input file.");
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file.");
  process.exit(1);
}

// Read data from the input file
const data = fs.readFileSync(options.input, 'utf-8');
let jsonData;
try {
  jsonData = JSON.parse(data);
} catch (err) {
  console.error("Invalid JSON file, please check your input!");
  process.exit(1);
}

// Write to output file if the -o option is provided
if (options.output) {
  fs.writeFileSync(options.output, JSON.stringify(jsonData, null, 2), 'utf-8');
}

// Display the output in console if the -d option is provided
if (options.display) {
  console.log(JSON.stringify(jsonData, null, 2));
}

// Success message
console.log("Program executed successfully!");
