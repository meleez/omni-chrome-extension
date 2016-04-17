const GOOGLE_REDIRECT_URI = 'http://127.0.0.1:1337/google';
const GOOGLE_CLIENT_ID = '1649235ae4e380dd699c';
const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/drive.readonly';
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?scope=${GOOGLE_SCOPE}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&client_id=${GOOGLE_CLIENT_ID}&access_type=offline&approval_prompt=force`;
const GOOGLE_DRIVE_URL = 'https://www.googleapis.com/drive/v2/files?maxResults=1000&q=mimeType%3D%22application%2Fvnd.google-apps.document%22+or+mimeType%3D%22application%2Fvnd.google-apps.spreadsheet%22+or+mimeType%3D%22application%2Fvnd.google-apps.presentation%22&fields=items,nextPageToken';


function showOptions(omni) {
  omni.addItems({
    title: 'Login',
    link: GOOGLE_AUTH_URL,
  });
  omni.sendFeedback();
}

function updateCache(omni) {
  chrome.storage.local.get('google_access_token', (value) => {
    getFiles(value.google_access_token)
    .then((body) => {
      const items = body.map((item) => ({ title: item.full_name, link: item.html_url }));
      omni.saveCache('google_drive_items', items, () => {
        // omni.addItems(...items);
        // omni.sendFeedback();
      });
    });
  });
}

function getFiles(accessToken, prev = [], nextPageToken = null) {
  return fetch(nextPageToken ? GOOGLE_DRIVE_URL + `&pageToken=${nextPageToken}` : GOOGLE_DRIVE_URL,
    {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      }),
    })
    .then((response) => (response.json()))
    .then((body) => {
      if (body.nextPageToken) return getFiles(accessToken, body.items, body.nextPageToken);
      return body.items.concat(prev);
    });
}

function showItemsInCache(omni, query) {
  omni.getCache('google_drive_items', (items) => {
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

