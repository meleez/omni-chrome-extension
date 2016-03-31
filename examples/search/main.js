const Omni = require('./../omni');
const omni = new Omni();

function start() {
  let input = omni.args[0]

  omni.add_item({
    title: `Search ${input}`,
    arg: `https://www.google.com/search?q=${input}`
  });

  omni.send_feedback();

}


omni.run(start);

