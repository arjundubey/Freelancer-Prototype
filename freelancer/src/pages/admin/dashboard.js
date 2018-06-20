import React from "react";
import DashboardTabbedNav from "../../components/dashboardTab.js";
import {ajax,rBridge} from '../../helpers/helpers';

class Dashboard extends React.Component {
  
  state = { projects : [] } 
  
  componentDidMount() {
    
      let obj = this;
      setTimeout(function(){

         if(obj.props.guest){

              obj.props.history.push('/notallowed');    
          }
    
      },1400);


      ajax({ filter: { user : true }   },function(response){

        obj.setState({ projects : response });

      },"/dashprojects");

  }
  
	render() {

    let items = [],t;

     for(var i=0;i<this.state.projects.length;i++) {
      
      t = this.state.projects[i];
             var slug = '/projects/'+t.slug; 
    
      var avatar;
      if(t.bid_winner_details.avatar === ""){
        avatar = <span className="avatar bg-purple">{t.bid_winner_details.first_name}+""{t.bid_winner_details.last_name}</span>
      } else {
        avatar = <img alt="avatar" src={"http://localhost:3000/uploads/"+t.bid_winner_details.avatar} className="avatar avatar-lg mr-3" />
      }

      items[i] = (
        <a href={slug} className="list-group-item list-group-item-action d-flex align-items-center">
            <div className="list-group-img">
                {avatar}
            </div>
            <div className="list-group-content">
                <div className="list-group-heading">{t.name} <small style={{color:'#fff',fontWeight:600}} className="badge badge-md badge-pill badge-primary text-uppercase">Estimated Time : {t.win_bid_details.time} days, Price: ${t.win_bid_details.price}</small></div>
                <p className="text-sm">User {t.bid_winner_details.first_name} is working on it.</p>
            </div>
        </a>
        );




    }

		return (
                
               <div className="dashboard-page">

                  <DashboardTabbedNav path={this.props.location.pathname} />


                  <div className="page-content no-banner">
         
                      <div className="container">
                          <div className="row home-row-1 padding-75">
                               

                               <div className="col-12 col-lg-12">
                                   
                                   <div className="card">
                                    <div className="card-header py-4">
                                        <div className="d-flex align-items-center">
                                            <h4 className="heading h5 mb-0">Projects</h4>
                                        </div>
                                    </div>
                                    <div className="list-group">
                                       {items}
                                    </div>
                                    </div>
                               </div> 



                          </div> 
                      </div>

                </div>
           </div> 
  

		);

	}

}

export default rBridge(Dashboard);

