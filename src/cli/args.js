import { argv } from 'node:process';

const parseArgs = () => {
  const consoleMessageArray = [];
  for (let i = 2; i <= argv.length - 1; i=i+2) {
    const varName = (`${argv[i]}`).slice(2);
    const varContent = `${argv[i+1]}`;
    consoleMessageArray.push(`${varName} is ${varContent}`);
  }
  const consoleMessageString = consoleMessageArray.join(', ');
  console.log(consoleMessageString);
};

parseArgs();