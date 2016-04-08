const React = require('react');
const ReactDOM = require('react-dom');
const View = require('./view');

const packages = {
  i: require('../../examples/search-image'),
  cdn: require('../../examples/cdn'),
  dist: require('../../examples/distance-matrix'),
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
    if (keyword in packages && query.length) {
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
