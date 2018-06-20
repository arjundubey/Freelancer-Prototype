import React from 'react';

import CalcHeader from './component/calcHeader';
import calcButton from './component/button';
import CalcBody from './component/body';
import axios from 'axios';

var querystring = require('querystring');

class App extends React.Component {

  state = { n1 :0 , n2:0 , result:0 }

  add = () => {

      var temp = this;
      axios.post('http://localhost:3010/add', querystring.stringify({
           n1 : document.querySelector('#n1').value,
           n2 : document.querySelector('#n2').value
           
          }) )
          .then(function (response) {

            temp.setState({ result : response.data.result  });

          });

  }

  subtract = () => {

      var temp = this;
      axios.post('http://localhost:3010/subtract', querystring.stringify({
           n1 : document.querySelector('#n1').value,
           n2 : document.querySelector('#n2').value
           
          }) )
          .then(function (response) {

            temp.setState({ result : response.data.result  });

          });

  }

  multiply = () => {

      var temp = this;
      axios.post('http://localhost:3010/multiply', querystring.stringify({
           n1 : document.querySelector('#n1').value,
           n2 : document.querySelector('#n2').value
           
          }) )
          .then(function (response) {

            temp.setState({ result : response.data.result  });

          });

  }

  divide = () => {

      var temp = this;
      axios.post('http://localhost:3010/divide', querystring.stringify({
           n1 : document.querySelector('#n1').value,
           n2 : document.querySelector('#n2').value
           
          }) )
          .then(function (response) {

            temp.setState({ result : response.data.result  });

          });

  }

  render() {
    return (
      <div className="App">
      
      <div className="calculator">
          <CalcHeader result={this.state.result} /> 
          <CalcBody add={this.add} subtract={this.subtract} multiply={this.multiply} divide={this.divide} />
        </div>

      </div>
    );
  }
}

export default App;
