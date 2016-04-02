const React = require('react');
const style = require('./styles/main');

class Item extends React.Component {
  render() {
    let itemStyle = style.item;
    if (this.props.index === this.props.active) {
      itemStyle = Object.assign({}, itemStyle, { backgroundColor: '#ccc' });
    }
    return (
      <li style={itemStyle}>
        <a href={this.props.link}>
          <h5>{ this.props.title }</h5>
          <span>{ this.props.subtitle }</span>
        </a>
      </li>
    );
  }
}

module.exports = Item;
