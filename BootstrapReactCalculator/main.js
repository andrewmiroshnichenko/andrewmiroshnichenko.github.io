'use scrict';

window.Calc = React.createClass({



  getInitialState: function() {
    return {displayWidth: 0, displayHeight: 0, displayText: '', firstNumber: '', secondNumder: ''};
  },

  getDefaultProps: function() {
    return {displayWidth: 0, displayHeight: 0, displayText: '', firstNumber: '', secondNumder: ''};
  },

  calculateDisplaySize: function() {

  },

  componentDidMount: function() {
  },
  
  calculateElementSize: function(elem) {
    // this.setState({displayWidth: parseFloat(getComputedStyle(elem).width) + this.state.displayWidth + 'px',
    //               displayHeight: parseFloat(getComputedStyle(elem.firstElementChild).height) + 'px'});
    this.props.displayWidth = parseFloat(getComputedStyle(elem).width) + parseFloat(this.props.displayWidth) + 'px';
    this.props.displayHeight = parseFloat(getComputedStyle(elem.firstElementChild).height) + 'px';
    this.setState({displayWidth: this.props.displayWidth, displayHeight: this.props.displayHeight});
  },
  inputText: function(event) {
    this.props.displayText = this.props.displayText + '' + event.target.innerHTML;
    this.setState({displayText: this.props.displayText});
  },

  render: function() {
    var displayStyle = {width: this.state.displayWidth, height: this.state.displayHeight, background: 'red'};
    var displayText = {};
		return (
      <div>
        <Display style={displayStyle} text={this.state.displayText} />
        <MainDigits calculate={this.calculateElementSize} inputText={this.inputText} />
        <CalcMath calculate={this.calculateElementSize}  />
      </div>
		);
	}
});

