const React = require('react');
const style = require('./styles/main');

class Item extends React.Component {
  render() {
    return (
      <li style={style.item}>
        <a href={this.props.link}>
          <h5>{ this.props.title }</h5>
          <span>{ this.props.subtitle }</span>
        </a>
      </li>
    );
  }
}

module.exports = Item;
