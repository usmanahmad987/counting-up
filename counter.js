const readline = require('readline');
const minimist = require('minimist');

// Parse command-line arguments
const args = minimist(process.argv.slice(2));

const targetNumber = parseInt(args.target, 10);
if (isNaN(targetNumber) || targetNumber <= 0) {
  console.error("Usage: node counter.js --target=<target_number>");
  console.error("Please provide a valid positive integer as the target number.");
  process.exit(1);
}

console.log(`Counting up to ${targetNumber}:`);

let currentNumber = 0;
let stopRequested = false;

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
    if (key.name === 'space') {
        stopRequested = true;
    }
});

const interval = setInterval(() => {
    if (!stopRequested && currentNumber <= targetNumber) {
        console.log(currentNumber);
        currentNumber++;
    } else {
        clearInterval(interval);
        if (stopRequested) {
            console.log('Counting interrupted by space key.');
        } else {
            console.log('Counting finished.');
        }
        process.exit(0);
    }
}, 1000);
