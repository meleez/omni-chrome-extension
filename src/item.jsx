const React = require('react');
const style = require('./styles/main');

class Item extends React.Component {

  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }

  select(e) {
    e.preventDefault();
    this.props.select(this.props.index);
  }

  render() {
    let itemStyle = style.item;
    if (this.props.index === this.props.active) {
      itemStyle = Object.assign({}, itemStyle, { backgroundColor: '#ccc' });
    }
    return (
      <li style={itemStyle}>
        <a href={this.props.link} onClick={this.select} style={style.link}>
          <h4>{ this.props.title }</h4>
          <span>{ this.props.subtitle }</span>
        </a>
      </li>
    );
  }
}

module.exports = Item;
