'use scrict';
window.MainDigits = React.createClass({
	componentDidMount() {
		this.props.calculate(document.querySelector('.maindigits'));
	},
	render: function() {
		return (
			<table className="maindigits" onClick={this.props.inputText}>
				<tr>
					<td className=""><button>1</button></td>
					<td className=""><button>2</button></td>
					<td className=""><button>3</button></td>
				</tr>
				<tr>
					<td className=""><button>4</button></td>
					<td className=""><button>5</button></td>
					<td className=""><button>6</button></td>
				</tr>
				<tr>
					<td className=""><button>7</button></td>
					<td className=""><button>8</button></td>
					<td className=""><button>9</button></td>
				</tr>
				<tr>
					<td colSpan="2" className=""><button>0</button></td>
					<td className=""><button>.</button></td>
				</tr>
			</table>
		);
	}
});