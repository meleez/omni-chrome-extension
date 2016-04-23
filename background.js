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
