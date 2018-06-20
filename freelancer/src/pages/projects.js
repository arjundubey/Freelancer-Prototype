import React from "react";
import DashboardTabbedNav from "../components/dashboardTab.js";
import {ajax} from '../helpers/helpers';

import Moment from 'react-moment';

class Projects extends React.Component {
  
  state = { projects : [] } 
  
  componentDidMount() {

      let obj = this;
      ajax({},function(response){

        obj.setState({ projects : response });

      },"/projects");

  }

	render() {

    let items = [],t;

    for(var i=0;i<this.state.projects.length;i++) {
      
      t = this.state.projects[i];
             var slug = '/projects/'+t.slug; 

      var status = <span className="badge badge-md badge-pill badge-secondary text-uppercase">OPEN</span>;       

      if(t.status === 'CLOSED')
          status = <span className="badge badge-md badge-pill badge-warning text-uppercase">CLOSED</span>; 

      items[i] = (
        <li key={"pr"+i} className="clearfix">
                                        
            <div className="icon-li">
                <img src="//localhost:3000/css/i/idea.png" alt="" />
            </div>


             <div className="desc-li">
                <h3><a href={slug}>{t.name}</a> {status}</h3>
                <div className="text">{t.description}</div>
            </div>

            <div className="bids-li">{t.bids.length}</div>
            
            <div className="started-li"><span className="date"><Moment fromNow>{t.createdAt}</Moment></span></div>            
            
            <div className="range-li">${t.min_budget} - ${t.max_budget}</div>                

        </li>
        );

    }

		return (
                
               <div className="project-create-page">

                  <DashboardTabbedNav path={this.props.location.pathname} />


                  <div className="page-content no-banner">
         
                      <div className="container">
                          <div className="row home-row-1 padding-75">
                            

                            <div className="col-12 col-lg-12">
                     
                    


                     <div className="project-widget">
                        
                          <div className="project-widget-body">
                              
                                 
                                <ul className="project-lists clearfix">
                                    

                                    {items}


                                </ul>

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

export default Projects;

