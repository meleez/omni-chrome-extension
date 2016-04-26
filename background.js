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

// listen for geolocation requests
chrome.runtime.onMessage.addListener((message, sender, respond) => {
  if (message.message === 'toggle') toggleState();

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

// tabId, id of new tab
// windowId, id of prev tab
chrome.tabs.onActivated.addListener(({tabId, windowId}) => {
  console.log(tabId, windowId);
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

function deactivateOmni(tabId) {
  if (!tabId) return;
  isActive = false;
  chrome.tabs.executeScript(tabId, {
    file: 'removeContent.js',
  });
}
