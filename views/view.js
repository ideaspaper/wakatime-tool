const { program } = require("commander");
const ora = require('ora');
const spinner = ora('Loading...');

class View {
  static spinnerStart() {
    spinner.start('Loading...');
  }

  static spinnerFail() {
    spinner.fail('Process failed');
  }

  static spinnerSuccess() {
    spinner.succeed('Done!');
  }

  static runCommand(data) {
    View.spinnerSuccess();
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
    View.spinnerFail();
    if (error.name === 'InvalidOptions') program.error('Error: Invalid Options');
    else program.error(error);
  }
}

module.exports = View;
