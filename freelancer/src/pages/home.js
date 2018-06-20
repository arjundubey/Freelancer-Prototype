import React from "react";
import Slider from '../components/slider';
import {ajax} from '../helpers/helpers';


class HomePage extends React.Component {

  state = { projects : [] } 
  
  componentDidMount() {

      let obj = this;
      ajax({},function(response){

        obj.setState({ projects : response });

      },"/projects");

  }


	render() {

    let projects = [],t;

    for(var i=0;i<this.state.projects.length;i++) {
      
      t = this.state.projects[i];
             var slug = '/projects/'+t.slug; 

        var avatar;
      if(t.user.avatar === ""){
        avatar = <span className="avatar bg-purple avatar-lg mr-3">{t.user.first_name[0]}{t.user.last_name[0]}</span>
      } else {
        avatar = <img alt="avatar" src={"http://localhost:3000/uploads/"+t.user.avatar} className="avatar avatar-lg mr-3" />
      }

      projects[i] = (
       <div key={"pr-"+i} className="col-md-6">
              <div className="card">
                  <div className="card-body">
                      <h5 className="heading heading-5 strong-600"><a href={slug}>{t.name}</a></h5>
                      <h6 className="heading heading-sm strong-400 text-muted mb-4">
                          Skills : {t.skills}
                      </h6>
                      <p className="card-text">{t.description.substring(0, 160)}</p>
                       
                  </div>
                  <div className="card-footer">
                      <div className="row align-items-center">
                          <div className="col">
                              {avatar}
                              <span className="avatar-content">By {t.user.first_name}</span>
                          </div>
                          <div className="col text-right text-xs-right">
                              <ul className="list-inline mb-0">
                                  <li className="list-inline-item pr-2">
                                     Bids {t.bids.length}
                                  </li>
                                  <li className="list-inline-item">
                                      <span className="badge badge-md badge-pill badge-tertiary text-uppercase">Budget: ${t.min_budget} - ${t.max_budget}</span>

                                  </li>
                              </ul>
                          </div>

                      </div>
                      
                  </div>
              </div>
          </div>
        );

    }

		return (
                
               <div className="home-page">

                         <div className=" home-row-1 home-projects white-bg padding-100"> 
                              <div className="container">
                          <div className="row">
                              <div className="col-lg-12">
                                <h3>Projects</h3>
                              </div>
                              {projects}
                              </div>

                          </div>
                         </div>

               </div>    

		);

	}

}

export default HomePage;

