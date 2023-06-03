import readline from "readline";

const handleCliInput = (eventBus) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (input) => {
    eventBus.broadcast(input);
  });

  rl.on("close", () => {
    process.exit(0);
  });
};

export default handleCliInput;
