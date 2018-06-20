import React from "react";
import {rBridge,ajax} from '../helpers/helpers';


class Header extends React.Component {

  logout = (e) => {
     e.preventDefault();

     ajax({ type : 'logout' },function(r){

        window.location.href=  '/logout';

     })

  }

	render() {

    let nav;

    if(this.props.userLoggedIn === true) {

       nav = ( <div id="main-area">
                    
                     <div className="user-menu-bar">
                        <a href="/dashboard" className='has-dropdown'><span>Hi, {this.props.user.first_name}</span> </a>
                          <ul className="submenu">
                              <li><a href="/user/projects">My Projects</a></li>
                              <li><a href="/user/bids">My Bids</a></li>
                              <li><a href="/user/profile">Profile</a></li>
                           </ul>
                     </div> 
                     <a href="/logout" onClick={this.logout} className="logout-btn">Logout</a>
                     <a href="/dashboard" className="dashboard-btn">Dashboard</a>
                 </div>    );

    } else {

      nav = ( <div id="main-area">
                                                                     
                                   <a href="/login" className="btn btn-primary">Login</a>
                                   <a href="/register" className="btn btn-secondary">Register</a>
                                  
                            </div>
                            );

    }

		return (

                
               <div id="main-bar">
         
                <div className="container">
                    
                    <div className="row">
                        <div className="col-5 col-md-3">
                             <a href="/" id="logo"><img src=" http://localhost:3000/css/i/freelancer-logo.svg" alt="" /></a>
                        </div>
                        
                        <div className="col-7 col-md-9">
                            
                                
                            <nav id="main-menu">
                                <ul className='clearfix'>
                                    <li><a href="/" className='has-dropdown'>Home</a></li>
                                                                      <li><a href="/projects">Projects</a></li>
                                                                  </ul>
                            </nav>      

                            {nav}

                            

                        </div>   
                        
                        
                    </div>

                    </div>


                </div> );

	}

}



export default rBridge(Header);

