const Omni = require('./../../src/omni');
const omni = new Omni();

function start() {
  let input = omni.args[0]

  omni.add_item({
    title: `Search ${input}`,
    arg: `https://www.google.com/search?q=${input}&tbm=isch`
  });

  omni.send_feedback();

}

omni.run(start);

module.exports = omni;

