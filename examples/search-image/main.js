module.exports = function searchImage(omni, query) {
  console.log(query, omni);
  omni.removeItems();
  omni.addItems(
    { title: 'corn', link: imgLink('corn'), subtitle: 'google images' },
    { title: 'tigers', link: imgLink('tigers'), subtitle: 'google images' },
    { title: 'kids', link: imgLink('kids'), subtitle: 'google images' }
  );
  omni.sendFeedback();
};

function imgLink(query) {
  return `https://www.google.com/search?tbm=isch&q=${query}`;
}
