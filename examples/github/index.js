const GITHUB_REDIRECT_URI = 'http://127.0.0.1:1337/github';
const GITHUB_CLIENT_ID = '1649235ae4e380dd699c';
const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=repo`;

function showOptions(omni) {
  omni.addItems({
    title: 'Login',
    link: GITHUB_AUTH_URL,
  });
  omni.sendFeedback();
}

function updateCache(omni) {
  chrome.storage.local.get('github_access_token', (value) => {
    getRepos(value.github_access_token)
    .then((body) => {
      const items = body.map((item) => ({
        title: item.full_name,
        link: item.html_url,
      }));
      omni.saveCache('github_items', items, () => {
        // omni.addItems(...items);
        // omni.sendFeedback();
      });
    });
  });
}

function getRepos(accessToken, prev = [], page = 1) {
  return fetch(`https://api.github.com/user/repos?access_token=${accessToken}&per_page=100&page=${page}`, {
    method: 'GET',
    mode: 'cors-with-forced-preflight',
  })
  .then((response) => (response.json()))
  .then((body) => {
    if (body.length === 100) return getRepos(accessToken, prev.concat(body), page + 1);
    return prev.concat(body);
  });
}

function showItemsInCache(omni, query) {
  omni.getCache('github_items', (items) => {
    omni.addItems(...items.filter((item) =>
      item.title.toLowerCase().indexOf(query.toLowerCase()) >= 0));
    omni.sendFeedback();
  });
}

module.exports = function github(omni, query) {
  if (query && query[0] === '>') return showOptions(omni);
  updateCache(omni);
  showItemsInCache(omni, query);
};
