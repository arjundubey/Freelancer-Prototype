import React from 'react';

class CalcHeader extends React.Component {
	 render () {
	 	      return(
                  <div className="calculator-head clearfix">
                  		<input id="n1" type="text" />
                  		<input id="n2" type="text"/>
                  		<div className="calculator-result">{this.props.result}</div>
                  </div>
	 	      	)
	 }
  
}

export default CalcHeader;