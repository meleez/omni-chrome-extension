module.exports = function start(omni, query) {
  
  fetch(`http://api.cdnjs.com/libraries?search=${query}&fields=version,description`)
    .then((res) => {
      return res.json()
    })
    .then((body) => {
      omni.removeItems();
      let results = body.results;
      for (let i = 0; i < 10; i++) {
        omni.addItems({
          title: results[i].name,
          link: results[i].latest,
        });
      }

      omni.sendFeedback();

    });
};