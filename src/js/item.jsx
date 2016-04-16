const React = require('react');
// const style = require('./styles/main');

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
    let itemStyle = {};
    if (this.props.index === this.props.active) {
      itemStyle.backgroundColor = 'rgba(95, 202, 255, .4)';
    }
    return (
      <li style={itemStyle} className="item">
        <a target="_blank" href={this.props.link} onClick={this.select}>
          <h4>{ this.props.title }</h4>
          <span className="subtitle">{ this.props.subtitle }</span>
        </a>
      </li>
    );
  }
}

module.exports = Item;
