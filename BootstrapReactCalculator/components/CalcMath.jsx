'use scrict';
window.CalcMath = React.createClass({
  componentDidMount() {
    this.props.calculate(document.querySelector('.calcmath'));
  },
  render: function() {
    return (
      <table className="calcmath">
        <tr>
          <td className=""><button>+</button></td>
        </tr>
        <tr>
          <td className=""><button>-</button></td>
        </tr>
        <tr>
          <td className=""><button>*</button></td>
        </tr>
        <tr>
          <td className=""><button>/</button></td>
        </tr>
      </table>
    );
  }
});