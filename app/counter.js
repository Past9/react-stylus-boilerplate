"use strict";

var React = require("react");

class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: parseInt(this.props.start)
    };
  }

  clickInc() {
    console.log(this);
    for (var i = 0; i < 1000; ++i) {
      console.log("GO");
      this.setState({
        value: this.state.value + 1
      });
    }
  };

  clickShout() {
    console.log("SHOUT!");
  };

  render() {
    return (
      <div>
        <button onClick={() => this.clickInc()}>Inc</button>
        <label>{this.state.value}</label>
        <button onClick={() => this.clickShout()}>Shout</button>
      </div>
    );
  }

}

module.exports = Counter;
