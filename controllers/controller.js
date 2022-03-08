const fs = require('fs/promises');
const wakatimeClient = require('./../helpers/wakatime-helper');
const View = require('../views/view');

const rangeQuery = {
  yesterday: 'Yesterday',
  today: 'Today',
  last7: 'Last 7 Days',
  last14: 'Last 14 Days'
};

class Controller {
  static async listCommand() {
    try {
      View.spinnerStart();
      let students = JSON.parse(await fs.readFile('./keys.json', { encoding: 'utf-8' }));
      View.listCommand(students);
    } catch (error) {
      View.displayError(error);
    }
  }

  static async runCommand() {
    try {
      View.spinnerStart();
      const range = rangeQuery[this.opts().range];
      if (!range) throw { name: 'InvalidOptions' };
      let students = JSON.parse(await fs.readFile('./keys.json', { encoding: 'utf-8' }));
      const studentName = this.opts().name;
      if (studentName) {
        students = students.filter((element) => {
          if (element.name.toLowerCase().indexOf(studentName.toLowerCase()) >= 0) return true;
          else return false;
        });
      }
      let result = [];
      students.forEach((element) => {
        const base64Token = Buffer.from(element.key).toString('base64').trim();
        result.push(wakatimeClient({
          url: '/users/current/summaries',
          method: 'GET',
          headers: { Authorization: `Basic ${base64Token}` },
          params: { range, timezone: 'Asia/Jakarta' }
        }));
      });
      result = await Promise.all(result);
      result = result.map((element, index) => {
        return {
          name: students[index].name,
          result: element.data
        };
      });
      View.runCommand(result);
    } catch (error) {
      View.displayError(error);
    }
  }
}

module.exports = Controller;
