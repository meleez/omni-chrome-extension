console.log('ran');
// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(toggleState);

let isActive = false;

function toggleState(tab) {
  if (!isActive) activateOmni(tab);
  else deactivateOmni(tab);
  isActive = !isActive;
}

function activateOmni(tab) {
  chrome.tabs.insertCSS(tab.id, {
    file: 'style.css'
  })
  chrome.tabs.executeScript(null, {
    file: 'content.js'
  });
}

function deactivateOmni(tab) {
  chrome.tabs.executeScript(null, {
    file: 'removeContent.js'
  });
}