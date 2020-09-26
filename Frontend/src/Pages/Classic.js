
import React from 'react'
import { ClassicGame } from '../Components';
import './CSS/Classic.css';

class Classic extends React.Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div>
        <ClassicGame/>
      </div>
    );
  }
}

export default Classic;
