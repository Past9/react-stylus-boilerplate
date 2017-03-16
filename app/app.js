"use strict";

var React = require("react");
var Counter = require("./counter.js");

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hello world</h1>
        <Counter start="10"></Counter>
      </div>
    );
  }
});

module.exports = App;
