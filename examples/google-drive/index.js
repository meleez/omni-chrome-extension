const GOOGLE_REDIRECT_URI = `${process.env.REDIRECT_URI}/google`;
const GOOGLE_CLIENT_ID = '991745315349-5e2sockl1s1rs5shrfrop0jvo4al7rbp.apps.googleusercontent.com';
const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/drive.readonly';
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?scope=${GOOGLE_SCOPE}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&client_id=${GOOGLE_CLIENT_ID}&access_type=offline&approval_prompt=force`;
const GOOGLE_DRIVE_URL = 'https://www.googleapis.com/drive/v2/files?maxResults=1000&q=mimeType%3D%22application%2Fvnd.google-apps.document%22+or+mimeType%3D%22application%2Fvnd.google-apps.spreadsheet%22+or+mimeType%3D%22application%2Fvnd.google-apps.presentation%22&fields=items,nextPageToken';


function showOptions(omni) {
  omni.addItems({
    title: 'Login',
    link: GOOGLE_AUTH_URL,
  });

  omni.addItems({
    title: 'Logout',
    onActivated: function onActivated() {
      console.log('active');
      chrome.storage.local.remove(['google_access_token', 'google_drive_items'], () => {
        omni.showNotification({
          title: 'Google Drive',
          message: 'Logout Successful',
          iconUrl: './examples/google-drive/logo.png',
        });
      });
    },
  });

  omni.sendFeedback();
}

function updateCache(omni) {
  chrome.storage.local.get('google_access_token', (value) => {
    getFiles(value.google_access_token, (body) => {
      const items = body.map((item) => ({
        title: item.title,
        link: item.alternateLink,
      }));
      omni.saveCache('google_drive_items', items, () => {
        // omni.addItems(...items);
        // omni.sendFeedback();
      });
    });
  });
}

function getFiles(accessToken, cb, prev = [], nextPageToken = null) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', nextPageToken ? GOOGLE_DRIVE_URL + `&pageToken=${nextPageToken}` : GOOGLE_DRIVE_URL);
  xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const body = JSON.parse(xhr.responseText);
      if (body.nextPageToken) {
        return getFiles(accessToken, cb, prev.concat(body.items), body.nextPageToken);
      }
      cb(prev.concat(body.items));
    }
  };
}

function showItemsInCache(omni, query) {
  omni.getCache('google_drive_items', (items) => {
    omni.addItems(...items.filter((item) => item.title.toLowerCase().indexOf(query.toLowerCase()) >= 0));
    omni.sendFeedback();
  });
}

module.exports = function github(omni, query) {
  if (query && query[0] === '>') return showOptions(omni);
  if (query.length === 1) updateCache(omni);
  showItemsInCache(omni, query);
};
