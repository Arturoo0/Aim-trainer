
import React from 'react';
import './CSS/ScoreReport.css';

class ScoreReport extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  computeAccuracy(){
    const ref = this.props.report;
    if (ref.clicks == 0) return 0;
    return Math.floor((ref.score/ref.clicks) * 100);
  }

  render(){
    return(
      <div id='ScoreReport-root'>
        <div id='report-summary'>You hit {this.props.report.score} targets with an accuracy of {this.computeAccuracy()}%</div>
      </div>
    );
  }
}

export default ScoreReport;
