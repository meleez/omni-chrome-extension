const React = require('react');
const ReactDOM = require('react-dom');

// to remove: search image package
const searchImagePackage = require('./../examples/search-image/main');


let examplePackage = {
  'i' : searchImagePackage
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items : [{title: 'helo', arg: 'https://www.google.com'}],
      packages: {}
    }

    // todo : package with key (trigger word), value (package itself)
    // this.loadPackage();

  }


  _addItems(item) {
    let items = this.state.items;
    items.push(item);
    this.setState({items})
  }

  _removeItems() {
    this.setState({
      items: []
    });
  }

  _handleChange(event) {
    let input = event.target.value.split(' ');
    let keyword = input[0];
    let query = input[1];

    if (examplePackage[keyword]) {
      examplePackage[keyword](query);
    }
  }

  render() {
    let items = this.state.items.map((item) => 
        <Item title={item.title} subtitle={item.subtitle} args={item.arg}/>
      );

    console.log(items);

    return (
      <div style={containerStyle}>
        <input id="omni-chrome-input" type="text" style={inputStyle} autoFocus onChange={this._handleChange}/>
        {[items]}
      </div>
    );
  }
}


class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title || '',
      subtitle: this.props.subtitle || '',
      args: this.props.args || '',
    }
    console.log('creating item');
  }
  render() {
    console.log('rendering item');
    return (
      <div>
        <a href={this.state.args}>
          <span>{this.state.title}</span>
        </a>
      </div>
    );
  }
}

const containerStyle = {
  position: 'absolute',
  top: '100px',
  maxWidth: '200px',
  left: 0,
  right: 0,
  margin: '0 auto',
};

const inputStyle = {
  width: '200px',
};

const div = document.createElement('div');
div.id = 'omni-chrome';
document.body.appendChild(div);


window.addEventListener('keypress', e => {
  
  if (e.keyCode === 2 && e.ctrlKey) {
    toggleVisibility();
  }
});

let visible = false;
function toggleVisibility() {
  visible ? ReactDOM.unmountComponentAtNode(div) : ReactDOM.render(<Main />, div);
  visible = !visible;
}
