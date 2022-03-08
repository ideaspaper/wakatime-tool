const { program } = require("commander");
const ora = require('ora');
const spinner = ora('Loading...');

class View {
  static spinnerStart() {
    spinner.start('Loading...');
  }

  static spinnerFail() {
    spinner.fail('Process failed\n');
  }

  static spinnerSuccess() {
    spinner.succeed('Done!\n');
  }

  static listCommand(data) {
    View.spinnerSuccess();
    data.forEach((element) => {
      console.log(`\x1b[01m\x1b[36m► ${element.name}\x1b[0m`);
      console.log(`  API key: ${element.key}\n`);
    });
  }

  static runCommand(data) {
    View.spinnerSuccess();
    data.forEach((element) => {
      console.log(`\x1b[01m\x1b[36m► ${element.name}\x1b[0m`);
      console.log(`\x1b[01m\x1b[33m  └ Total minutes:\x1b[0m ${element.result.cummulative_total.text}`);
      element.result.data.forEach((element) => {
        if (element.projects.length) {
          element.projects.forEach((element) => {
            console.log(`\x1b[32m    └ ${element.name}:\x1b[0m ${element.text}`);
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
