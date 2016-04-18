const GITHUB_REDIRECT_URI = 'http://127.0.0.1:1337/';
const GITHUB_CLIENT_ID = '1649235ae4e380dd699c';
const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`;

// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(toggleState);

// listeresn to external scripts, used for saving access tokens to local storage
chrome.runtime.onMessageExternal.addListener((request) => {
  console.log(request);

  // todo: need to customize key for each application
  chrome.storage.local.set({ github_access_token: request.access_token }, () => {
    console.log('saved');
  });
});

chrome.runtime.onMessage.addListener((message, sender, respond) => {
  if (message.message === 'location') {
    navigator.geolocation.getCurrentPosition(pos => {
      respond({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }
  return true;
});

// listens to listeners from omni
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    if (msg.auth) {
      // needs to have multiple oauth strategies
      requestAccess();
    }
  });
});

function requestAccess() {
  chrome.tabs.create({ url: GITHUB_AUTH_URL });
}

let isActive = false;

function toggleState(tab) {
  if (!isActive) activateOmni(tab);
  else deactivateOmni(tab);
  isActive = !isActive;
}

function activateOmni(tab) {
  chrome.tabs.insertCSS(tab.id, {
    file: 'style.css',
  });
  chrome.tabs.executeScript(null, {
    file: 'content.js',
  });
}

function deactivateOmni() {
  chrome.tabs.executeScript(null, {
    file: 'removeContent.js',
  });
}
