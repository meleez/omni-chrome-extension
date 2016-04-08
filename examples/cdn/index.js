module.exports = function cdn(omni, query) {
  fetch(`https://api.cdnjs.com/libraries?search=${query[0]}&fields=version,description`)
    .then(res =>
      res.json()
    )
    .then(body => {
      omni.removeItems();
      const results = body.results;
      // display up to 15 results
      for (let i = 0; i < Math.min(results.length, 10); i++) {
        omni.addItems({
          title: results[i].name,
          subtitle: results[i].latest,
          clipboard: results[i].latest,
        });
      }
      omni.sendFeedback();
    });
};
