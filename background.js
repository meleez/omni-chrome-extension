// note to self, mocha does not support let

// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(toggleState);
// listeresn to external scripts, used for saving access tokens to local storage
chrome.runtime.onMessageExternal.addListener((request) => {
  const storageObj = {};
  let title;
  let message;
  let iconUrl;
  // todo: need to customize key for each application
  switch (request.type) {
    case 'github':
      storageObj.github_access_token = request.access_token;
      break;
    case 'google':
      storageObj.google_access_token = request.access_token;
      title = 'Google Drive';
      message = 'Login Complete';
      iconUrl = '/examples/google-drive/logo.png';
      break;
    default:
      console.log('not supported auth strategies');
      return;
  }
  console.log('about to set');
  chrome.storage.local.set(storageObj, () => {
    showNotification(title, message, iconUrl);
  });
});

// listen for geolocation, tabs changing, notification requests
chrome.runtime.onMessage.addListener((message, sender, respond) => {
  // if (message.action === 'toggle') toggleState();
  console.log(message);
  if (message.action === 'notification') {
    showNotification(message.title, message.message, message.iconUrl);
  }

  if (message.action === 'location') {
    navigator.geolocation.getCurrentPosition(pos => {
      respond({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }
  return true;
});

// tabId, id of new tab
// windowId, id of prev tab
chrome.tabs.onActivated.addListener(() => {
  // cannot destructure in params cause test does not support
  // let tabId, windowId = activeInfo;
  if (currTabId) deactivateOmni(currTabId);
});

chrome.windows.onFocusChanged.addListener(() => {
  if (currTabId) deactivateOmni(currTabId);
});

let isActive = false;
let currTabId;

function toggleState(tab) {
  if (!isActive) activateOmni(tab.id);
  else deactivateOmni(tab.id);
}

function activateOmni(tabId) {
  if (!tabId) return;
  currTabId = tabId;
  isActive = true;
  chrome.tabs.insertCSS(tabId, {
    file: 'style.css',
  });
  chrome.tabs.executeScript(tabId, {
    file: 'content.js',
  });
}

function showNotification(title, message, iconUrl) {
  console.log(title, message, iconUrl);
  chrome.notifications.create('', {
    type: 'basic',
    title,
    message,
    iconUrl,
  }, (err) => console.log('success', err));
}


function deactivateOmni(tabId) {
  if (!tabId) return;
  currTabId = null;
  isActive = false;
  chrome.tabs.executeScript(tabId, {
    file: 'removeContent.js',
  });
}
