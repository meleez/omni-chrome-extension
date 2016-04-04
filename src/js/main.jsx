const React = require('react');
const ReactDOM = require('react-dom');
const View = require('./view');

// to remove: search image package
const searchImagePackage = require('../../examples/search-image/main');
const cdnPackage = require('../../examples/cdn/main');
const packages = {
  i: searchImagePackage,
  cdn: cdnPackage,
};


class Omni {
  constructor() {
    this.visible = false;
    this.items = [];
    this.div = document.createElement('div');
    this.div.id = 'omni-chrome';
    document.body.appendChild(this.div);

    window.addEventListener('keypress', e => {
      // if ctrl-B is pressed
      if (e.keyCode === 2 && e.ctrlKey) {
        this.toggleVisibility();
      }
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
    if (keyword in packages) {
      packages[keyword](this, query);
    } else {
      this.removeItems();
      this.sendFeedback();
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
