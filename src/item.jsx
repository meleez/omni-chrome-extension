const React = require('react');

class Item extends React.Component {
  render() {
    return (
      <li>
        <a href={this.props.link}>
          <h5>{ this.props.title }</h5>
          <span>{ this.props.subtitle }</span>
        </a>
      </li>
    );
  }
}

module.exports = Item;
