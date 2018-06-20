import React from 'react';
import Button from './button';

class calcBody extends React.Component {
         
        


    inputPercent(){
          const{displayValue}=this.state
          const value=parseFloat(displayValue)
          this.setState({
            displayValue:String(value/100)
          })
        }



	 render () {


	 	      return(
                    <div className="calculator-body clearfix">
                      <button onClick={this.props.add} className="btn key-add">+</button>
                      <button onClick={this.props.subtract} className="btn key-subtract">-</button>
                      <button onClick={this.props.divide} className="btn  key-divide">/</button>
                      <button onClick={this.props.multiply} className=" btn key-multiply">*</button>
      </div>
	 	      	)
	 }

  
}


 


export default calcBody;