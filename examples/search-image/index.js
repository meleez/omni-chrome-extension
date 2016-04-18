module.exports = function searchImage(omni, query) {
  omni.removeItems();
  const phrase = query;
  if (phrase) {
    omni.addItems(
      { title: phrase, link: imgLink(phrase), subtitle: `Search Google images for "${phrase}".` }
    );
  }
  omni.sendFeedback();
};

function imgLink(phrase) {
  return `https://www.google.com/search?tbm=isch&q=${phrase}`;
}
