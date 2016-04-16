const React = require('react');
const ReactDOM = require('react-dom');
const View = require('./view');
const port = chrome.runtime.connect({ name: 'omni' });
const packages = {
  i: require('../../examples/search-image'),
  cdn: require('../../examples/cdn'),
  dist: require('../../examples/distance-matrix'),
  g: require('../../examples/github/main'),
};

port.onMessage.addListener((msg) => {
  console.log('response', msg);
});
class Omni {
  constructor() {
    this.visible = true;
    this.items = [];
    this.div = document.createElement('div');
    this.div.id = 'omni-chrome';
    document.body.appendChild(this.div);
    this.render();
  }

  // todo needs to namespace by app later
  saveCache(key, value, cb) {
    const obj = {};
    obj[key] = value;
    chrome.storage.sync.set(obj, cb);
  }

  getCache(key, cb) {
    // todo : prevent null from being passed in - its gets all content in storage

    chrome.storage.sync.get(key, (item) => {
      console.log(item);
      cb(item[key]);
    });
  }

  addItems(...items) {
    this.items.push(...items);
  }

  removeItems() {
    this.items = [];
  }

  sendFeedback() {
    this.render();
  }

  toggleVisibility() {
    if (this.visible) {
      ReactDOM.unmountComponentAtNode(this.div);
    } else {
      this.render();
    }
    this.visible = !this.visible;
  }

  onInputChange(keyword, query) {
    this.removeItems();
    if (keyword in packages && query.length) {
      packages[keyword](this, query);
    } else {
      // this.sendFeedback();
    }
  }

  render() {
    ReactDOM.render(
      <View
        items={this.items} onInputChange={this.onInputChange.bind(this)}
        toggleVisibility={this.toggleVisibility.bind(this)}
      />,
      this.div
    );
  }
}

window.omni = new Omni;
