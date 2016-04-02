module.exports = function start(omni, query) {
  fetch(`https://api.cdnjs.com/libraries?search=${query}&fields=version,description`)
    .then(res =>
      res.json()
    )
    .then((body) => {
      omni.removeItems();
      const results = body.results;
      // display up to 15 results
      for (let i = 0; i < Math.min(results.length, 15); i++) {
        omni.addItems({
          title: results[i].name,
          link: results[i].latest,
        });
      }
      omni.sendFeedback();
    });
};
