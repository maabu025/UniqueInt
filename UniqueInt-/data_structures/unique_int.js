const fs = require('fs');

// Function to extract integers from the input file
function extractIntegers(inputFile) {
  // Helper function to process each line and convert to an integer
  function processLine(line) {
    line = line.trim(); // Remove leading and trailing whitespace
    const parsedInt = parseInt(line, 10); // Try to convert line to integer
    return isNaN(parsedInt) ? null : parsedInt; // Return null if not a valid integer
  }

  // Read the input file and process each line
  const fileContent = fs.readFileSync(inputFile, 'utf8');
  const lines = fileContent.split('\n'); // Split content by new lines
  return lines
    .map(processLine) // Map each line to integer
    .filter((num) => num !== null); // Filter out non-integers (null values)
}

// Function to remove duplicates, filter valid range, and sort the integers
function processIntegers(rawIntegers) {
  // Filter integers between -1023 and 1023 and remove duplicates using Set
  const validIntegers = rawIntegers.filter((num) => num >= -1023 && num <= 1023);
  const uniqueIntegers = [...new Set(validIntegers)]; // Remove duplicates
  return uniqueIntegers.sort((a, b) => a - b); // Sort in ascending order
}

// Function to write the processed integers to the output file
function writeToFile(outputFile, processedIntegers) {
  const fileContent = processedIntegers.join('\n'); // Join integers with new line
  fs.writeFileSync(outputFile, fileContent); // Write to output file
}

// Function to orchestrate the entire process (extract, process, and write integers)
function execute(inputFile, outputFile) {
  const rawIntegers = extractIntegers(inputFile); // Extract raw integers from the input file
  const processedIntegers = processIntegers(rawIntegers); // Process the integers
  writeToFile(outputFile, processedIntegers); // Write the processed integers to the output file
}

// Example usage (provide paths to input and output files)
const inputFile = 'UniqueInt/UniqueInt-/data_structure/sample_input/sample_01.txt'; // Input file path
const outputFile = 'UniqueInt/UniqueInt-/data_structures/sample_output/sample_01.txt_result.txt'; // Output file path

// Execute the process
execute(inputFile, outputFile);
