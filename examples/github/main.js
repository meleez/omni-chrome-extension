const GITHUB_REDIRECT_URI = 'http://127.0.0.1:1337/';
const GITHUB_CLIENT_ID = '1649235ae4e380dd699c';
const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`;


function showOptions(omni) {
  omni.addItems({
    title: 'Login',
    link: GITHUB_AUTH_URL,
  });
  omni.sendFeedback();
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
  if (query && query[0] === '>') return showOptions(omni);
  updateCache(omni);
  showItemsInCache(omni, query);
};

