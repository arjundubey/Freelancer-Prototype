 import React from 'react';


class calcButton extends React.Component {

	  clicked(){
	  	console.log('action performed');
	  }
	 render () {
			 	      return(
                      <div className="operator-key">
                      <button className="calculator key  key-add">+</button>
                      <button className="calculator key key-subtract">-</button>
                      <button className="calculator key  key-divide">/</button>
                      <button className="calculator key  key-multiply">*</button>
                      </div>

	 	      	)
	 }

  
}
 

 


export default calcButton;