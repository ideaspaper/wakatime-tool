const { program } = require("commander");

class View {
  static runCommand(data) {
    data.forEach((element) => {
      console.log(`\x1b[01m\x1b[36m► ${element.name}\x1b[0m`);
      console.log(`\x1b[33m  └ Total minutes: ${element.result.cummulative_total.text}\x1b[0m`);
      element.result.data.forEach((element) => {
        if (element.projects.length) {
          element.projects.forEach((element) => {
            console.log(`\x1b[32m    └ ${element.name}: ${element.text}\x1b[0m`);
          });
        }
      });
      console.log();
    });
  }

  static displayError(error) {
    if (error.name === 'InvalidOptions') program.error('Error: Invalid Options');
    else program.error(error);
  }
}

module.exports = View;
