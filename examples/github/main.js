// function authenticate(omni) {
//   // omni.addOauth({
//   //   oauth: "github",
//   //   client_secret: "a7d4c45e9dc563b07fb5e241f63c5e2f87241828",
//   //   client_id : "1649235ae4e380dd699c",
//   //   redirect_url: "http://localhost:1337?client_secret=a7d4c45e9dc563b07fb5e241f63c5e2f87241828&client_id=1649235ae4e380dd699c"
//   // });
//   omni.sendFeedback();
// }


function showOptions(omni) {

}

function updateCache(omni) {
  chrome.storage.sync.get('github_access_token', (value) => {
    fetch(`https://api.github.com/user/repos?access_token=${value.github_access_token}`, {
      method: 'GET',
      mode: 'cors-with-forced-preflight',
    })
    .then((response) => (response.json()))
    .then((body) => {
      const items = body.map((item) => ({ title: item.name, link: item.html_url }));
      omni.saveCache('github_items', items, () => {
        // omni.addItems(...items);
        // omni.sendFeedback();
      });
    });
  });
}

function showItemsInCache(omni, query) {
  omni.getCache('github_items', (items) => {
    omni.addItems(...items.filter((item) => item.title.toLowerCase().indexOf(query.toLowerCase()) >= 0));
    omni.sendFeedback();
  });
}

module.exports = function github(omni, query) {
  console.log(query);
  if (query && query[0] === '>') return showOptions(omni);
  updateCache(omni);
  showItemsInCache(omni, query);
};

