module.exports = function searchImage(omni, query) {
  omni.removeItems();
  if (query) {
    omni.addItems(
      { title: query, link: imgLink(query), subtitle: `Search Google images for "${query}".` }
    );
  }
  omni.sendFeedback();
};

function imgLink(query) {
  return `https://www.google.com/search?tbm=isch&q=${query}`;
}
