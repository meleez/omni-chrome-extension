const React = require('react');
const Item = require('./item');
const style = require('./styles/main');

class View extends React.Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const input = event.target.value.split(' ');
    const [keyword, query] = input;
    this.props.onInputChange(keyword, query);
  }

  render() {
    console.log(this.props.items);
    const items = this.props.items.map((item, i) =>
      <Item title={item.title} subtitle={item.subtitle} link={item.link} key={i} />
    );

    return (
      <div style={style.container}>
        <input
          id="omni-chrome-input" type="text" style={style.input} autoFocus
          onChange={this.onInputChange}
        />
        { items }
      </div>
    );
  }
}

module.exports = View;
