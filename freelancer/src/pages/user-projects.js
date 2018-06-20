import React from "react";
import DashboardTabbedNav from "../components/dashboardTab.js";
import {ajax,rBridge} from '../helpers/helpers';

import Moment from 'react-moment';

class UserProjects extends React.Component {
  
  state = { projects : [] } 
  
  componentDidMount() {
      


      let obj = this;
      ajax({ filter: { user : true }   },function(response){

        obj.setState({ projects : response });

      },"/projects");

  }

	render() {

    let items = [],t;

    for(var i=0;i<this.state.projects.length;i++) {
      
      t = this.state.projects[i];
             var slug = '/projects/'+t.slug; 
      var k = "pr"+i;       
      items[i] = (
        <li key={k} className="clearfix">
                                        
            <div className="icon-li">
                <img src="//localhost:3000/css/i/idea.png" alt="" />
            </div>


            <div className="desc-li">
                <h3><a href={slug}>{t.name}</a></h3>
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
                              
                                <ul className="project-lists-header clearfix">
                                        <li className='icon-li'></li>             
                                        <li className='desc-li'>Description</li>             
                                        <li className='bids-li'>No of Bids</li>             
                                        <li className='started-li'>Started At</li>             
                                        <li className='range-li'>Price Range</li>             
                                </ul>    
                                <ul className="project-lists clearfix">
                                    

                                    {items}


                                </ul>

                          </div>

                     </div>


                     <div className="project-widget">
                         <nav aria-label="Page navigation">
                          <ul className="pagination">
                            <li className="page-item ">
                              <a className="page-link" href="jsx-a11y/href-no-hash" >Previous</a>
                            </li>
                            <li className="page-item active"><a className="page-link" href="jsx-a11y/href-no-hash">1</a></li>
                            <li className="page-item"><a className="page-link" href="jsx-a11y/href-no-hash">2</a></li>
                            <li className="page-item"><a className="page-link" href="jsx-a11y/href-no-hash">3</a></li>
                            <li className="page-item">
                              <a className="page-link" href="jsx-a11y/href-no-hash">Next</a>
                            </li>
                          </ul>
                        </nav>
                     </div>


                 </div> 

                       



                      </div>
                    </div>

                </div>
           </div> 
  

		);

	}

}

export default rBridge(UserProjects);

