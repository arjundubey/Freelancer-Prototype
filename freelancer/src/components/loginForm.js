import React from "react";
import {ajax,formHandler} from '../helpers/helpers';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/index.js';

class LoginFormStub extends React.Component {

  loginUser = (event) => {

    event.preventDefault();

    let obj = this,temp = this.form, msg = this.msg;

  

    ajax({ 'type' : 'login-user' , formData : formHandler(temp) },(r) => { 



        if("success" in r && r.success === true) {

           obj.props.manageSession(true,r);

           obj.props.history.push('/dashboard'); 

        }


    })


  }

	render() {

		return (

		<section className="py-xl">
        <div className="container">
          <div className="row">
              <div className="col-lg-5">
              <form ref={(f) => {this.form = f;} } onSubmit={this.loginUser} className="form-primary">
                      <div className="form-group">
                        <input required type="email" className="form-control" name="email" placeholder="Your email" />
                      </div>
                      <div className="form-group">
                        <input type="password" required className="form-control" name="password" placeholder="Password" />
                      </div>
                      <button type="submit" className="btn btn-primary">Login</button>
                    </form><br/><br/>
              </div>  
          </div>
        </div>
     </section>
		);

	}

}



function mapStateToProps(state) { 

    return { user : state.user , guest : state.guest , userLoggedIn : state.userLoggedIn };
 } 

function mapDispatchToProps(dispatch) { 

    return bindActionCreators(actions,dispatch);
 } 

const LoginForm = connect(mapStateToProps,mapDispatchToProps)(LoginFormStub); 

export default LoginForm;

