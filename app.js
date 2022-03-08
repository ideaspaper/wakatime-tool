const { Command } = require('commander');
const Controller = require('./controllers/controller');

const program = new Command();
program
  .name('wakatime-tool')
  .description('Tool to monitor students\' coding time')
  .version('0.0.1');

program.command('run')
  .description('Get all students stats')
  .option('-n, --name <string>', 'student\'s name')
  .option('-r, --range <string>', 'yesterday \ntoday \nlast7: Last 7 days \nlast14: Last 14 days')
  .action(Controller.runCommand);

program.parse();