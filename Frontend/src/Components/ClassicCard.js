import React from 'react';
import './CSS/ClassicCard.css';

class ClassicCard extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  render() {
    return (
        <div id="classic-card" className="card">
          <div className="card-body">
            <h5 id="classic-card-title" className="card-title">Classic mode</h5>
            <p id="classic-card-text" className="card-text">3 lives to take out as many targets as you can. Targets progressively have smaller hit windows and start appearing more frequently.</p>
            <a id="classic-card-play" href="/play-classic" className="card-link">Go</a>
          </div>
        </div>
    );
  }
}

export default ClassicCard;
