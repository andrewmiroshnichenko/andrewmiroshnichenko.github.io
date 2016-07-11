'use scrict';
window.Display = React.createClass({
  render: function() {
    return (
      <div style={this.props.style}>{this.props.text}</div>
    );
  }
});