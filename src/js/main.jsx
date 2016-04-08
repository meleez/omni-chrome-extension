const React = require('react');
const ReactDOM = require('react-dom');
const View = require('./view');

// to remove: search image package
const searchImagePackage = require('../../examples/search-image/main');
const cdnPackage = require('../../examples/cdn/main');
const githubPackage = require('../../examples/github/main');

const packages = {
  i: searchImagePackage,
  cdn: cdnPackage,
  g: githubPackage,
};


class Omni {
  constructor() {
    this.visible = true;
    this.items = [];
    this.div = document.createElement('div');
    this.div.id = 'omni-chrome';
    document.body.appendChild(this.div);
    console.log('started');

    this.render();
  }

  addOauth(options) {
    this.addItems({
      title: 'Authenticate with Github',
      link: `https://github.com/login/oauth/authorize?client_id=${options.client_id}&redirect_url=${options.redirect_url}`,
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
      this.removeItems();
      packages[keyword](this, query);
    } else {
      console.log('removing');
      this.removeItems();
      this.sendFeedback();
    }
  }

  render() {
    console.log('started');
    console.log(this.div);
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
