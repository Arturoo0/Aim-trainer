
import React from 'react';
import { ClassicCard, ScoreReport } from '../Components';
import './CSS/Home.css';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  render(){
    return(
      <div id="home-root">
        <div className="row" style={{margin: '0 5%'}}>
          <div className="col-lg-6 mb-4" style={{margin: '30px auto',}}>
            <ClassicCard />
          </div>
        </div>
        <ScoreReport />
      </div>
    );
  }
}

export default Home;
