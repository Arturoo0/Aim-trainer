import React from 'react';
import './CSS/ClassicGame.css';
import { baseRequest } from '.././Utils';

function Target(xCoord, yCoord, Size){
  return {
    x : xCoord,
    y : yCoord,
    size : Size,
    maxSize : 30,
    growthFactor : .09
  };
}

function getRandomInt(max, coord){
  return Math.floor(Math.random() * Math.floor(max));
}

class ClassicGame extends React.Component {
  constructor(){
    super();
    this.state = {
      score : 0,
      buttonState : 'Play',
      lives : 3
    };

    this.targets = [];
    this.canvasRef = React.createRef();
    this.buttonRef = React.createRef();

    this.mouseDown = this.mouseDown.bind(this);
    this.buttonPressed = this.buttonPressed.bind(this);

    this.targetsPerFrame = {
      targetCount : 1,
      frameCount : 0,
      frameSumInterval : 600
    }
  }

  clearCanvas(){
    const { canvasRef : { current : canvas }} = this;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  resetGame(){
    this.targets.length = 0;
    this.targetsPerFrame = {
      targetCount : 1,
      frameCount : 0,
      frameSumInterval : 600
    }
    this.setState({
      score : 0,
      buttonState : 'Play',
      lives : 3,
      targets_appeared : 0
    });
    clearInterval(this.timerID);
  }

  buttonPressed(event){
      if (this.state.buttonState == 'Play'){
        this.timerID = setInterval(this.draw.bind(this), 10);
        this.setState({buttonState : 'null'})
      }else if (this.state.buttonState == 'Retry'){
        this.timerID = setInterval(this.draw.bind(this), 10);
        this.setState({buttonState : 'null'})
      }
  }

  renderPlayButton(){
    return(
      <button
        ref={this.buttonRef} id="play-game-classic"
        onClick={this.buttonPressed}
        >Play
      </button>
    );
  }

  renderRetryButton(){
    return(
      <button
        ref={this.buttonRef} id="play-game-classic"
        onClick={this.buttonPressed}
        >Retry
      </button>
    );
  }

  renderLives(){
    const lives = [];
    for (let i = 0; i < this.state.lives; i++)
      lives.push(<i class="fas fa-heart" style={{color : '#e94560', fontSize : '2rem', paddingTop : '17px', paddingRight : '5px'}}></i>);
    return lives;
  }

  mouseDown(event){
    const { targets, canvasRef : { current : canvas }} = this;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (let i = 0; i < targets.length; i++){
      let xBound = (x >= targets[i].x && x <= targets[i].x + targets[i].size);
      let yBound = (y >= targets[i].y && y <= targets[i].y + targets[i].size);

      if (xBound && yBound){
        this.setState({
          score : this.state.score += 1,
        })
        targets.splice(i, 1);
      }
    }
  }

  draw(){
    const { targets, canvasRef: { current : canvas }, targetsPerFrame} = this;
    const ctx = canvas.getContext('2d');
    targetsPerFrame.frameCount++;

    if (targetsPerFrame.frameCount > targetsPerFrame.frameSumInterval){
      targetsPerFrame.frameCount = 0;
      targetsPerFrame.targetCount++;
    }

    this.clearCanvas();

    let xSpawn = getRandomInt(canvas.width);
    let ySpawn = getRandomInt(canvas.height);
    let targetObject = Target(0, 0, 0);

    xSpawn = xSpawn + targetObject.maxSize > canvas.width ? canvas.width - targetObject.maxSize : xSpawn;
    ySpawn = ySpawn + targetObject.maxSize > canvas.height ? canvas.height - targetObject.maxSize : ySpawn;

    if (targets.length < targetsPerFrame.targetCount){
      targets.push(Target(xSpawn, ySpawn, 0));
      this.setState({targets_appeared : this.state.targets_appeared + 1});
    }
    ctx.fillStyle = 'white';

    targets.forEach(target => {
      ctx.fillRect(target.x, target.y, target.size, target.size);
      if (target.size + target.growthFactor > target.maxSize) target.growthFactor = -target.growthFactor;
      target.size += target.growthFactor;
    });

    const saveSize = targets.length;
    this.targets = targets.filter(target => target.size > 0)
    this.setState({lives : this.state.lives - (saveSize - this.targets.length)});

    if (this.state.lives <= 0){
      this.setState({buttonState : 'Retry'})
      baseRequest.post({
        player_score : this.state.score,
        targets_appeared : this.state.targets_appeared,
      });
      this.resetGame();
    }
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div id="canvas-container">
        <div id='score-board-float-container'>
          <div className='score-float-child' style={{textAlign : 'left'}}>
            <h1 id="score-counter" style={{color : 'white'}}>Score: {this.state.score}</h1>
          </div>
          <div className='score-float-child' style={{textAlign : 'right'}}>
            {this.renderLives()}
          </div>
        </div>
        <canvas
          id="canvas-classic"
          ref={this.canvasRef}
          onMouseDown={this.mouseDown}
          height={500}
          width={800}
        ></canvas>
        <div id="button-container">
          {this.state.buttonState == 'Play' ? this.renderPlayButton() : null}
          {this.state.buttonState == 'Retry' ? this.renderRetryButton() : null}
        </div>
      </div>
    );
  }

}

export default ClassicGame;
