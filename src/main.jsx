const React = require('react');
const ReactDOM = require('react-dom');

class Main extends React.Component {

  render() {
    return (
      <div style={containerStyle}>
        <input type="text" style={inputStyle} autoFocus />
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
  e.preventDefault();
  if (e.keyCode === 2 && e.ctrlKey) {
    toggleVisibility();
  }
});

let visible = false;
function toggleVisibility() {
  console.log(visible);
  visible ? ReactDOM.unmountComponentAtNode(div) : ReactDOM.render(<Main />, div);
  visible = !visible;
}
