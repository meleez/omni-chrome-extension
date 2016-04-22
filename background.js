const GITHUB_REDIRECT_URI = 'http://127.0.0.1:1337/';
const GITHUB_CLIENT_ID = '1649235ae4e380dd699c';
const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`;

// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(toggleState);

// listeresn to external scripts, used for saving access tokens to local storage
chrome.runtime.onMessageExternal.addListener((request) => {
  const storageObj = {};

  // todo: need to customize key for each application
  switch (request.type) {
    case 'github':
      storageObj.github_access_token = request.access_token;
      break;
    case 'google':
      storageObj.google_access_token = request.access_token;
      break;
    default:
      console.log('not supported auth strategies');
  }

  chrome.storage.local.set(storageObj, () => {
    console.log('saved');
  });
});

// listens to listeners from omni
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    if (msg.auth) {
      // needs to have multiple oauth strategies
      // requestAccess();
    }
  });
});

function requestAccess() {
  chrome.tabs.create({ url: GITHUB_AUTH_URL });
}

let isActive = false;
console.log(isActive);

function toggleState(tab) {
  console.log('clicked');
  if (!isActive) { activateOmni(tab); }
  else { deactivateOmni(tab); }
  isActive = !isActive;
}

function activateOmni(tab) {
  console.log('activate');
  chrome.tabs.insertCSS(tab.id, {
    file: 'style.css',
  });
  chrome.tabs.executeScript(null, {
    file: 'content.js',
  });
}

function deactivateOmni() {
  console.log('deactivate');
  chrome.tabs.executeScript(null, {
    file: 'removeContent.js',
  });
}
