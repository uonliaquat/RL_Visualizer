const STATE_SIZE = {WIDTH:60, HEIGHT:60};
class State{
  constructor(type, cordiates, position){
    this.type = type;
    this.cordiates = cordiates;
    this.position = position;
    this.value = 0;
    this.color = color(255, 255, 255);
    this.setPolicy();
    this.setColor();
    this.setReward(0);
    this.setLegalActions();
  }

  isMouseInside(){
    if(mouseX > this.cordiates.x && mouseX < this.cordiates.x + STATE_SIZE.WIDTH && mouseY > this.cordiates.y && mouseY < this.cordiates.y + STATE_SIZE.HEIGHT) return true;
    return false;
  }


  setColor(){
    switch (this.type) {
      case STATE_TYPE.DEFAULT:
        this.color =color(255, 255, 255);
        break;
      case STATE_TYPE.BRICK:
          this.color = color(0, 0, 0);
        break
      case STATE_TYPE.PIT:
        this.color = color(100, 40, 0);
        break;
      case STATE_TYPE.GOAL:
        this.color =color(0, 0, 200);
        break;
      default:
        break;
    }
  }

  setReward(reward){
    switch (this.type) {
      case STATE_TYPE.DEFAULT:
        this.value =  0;
        break;
      default:
        this.value = reward;
        break;
    }
  }

  setType(type){
    this.type = type;
  }

  setLegalActions(){
    if(this.type == STATE_TYPE.DEFAULT) {
      this.legal_actions =  {LEFT:0, UP:1, RIGHT:2, DOWN:3};
    }
    else{
      this.legal_actions =  {RIGHT:2};
    }
  }

  getMappedIndex(){
     return this.position.y * GRID_SIZE.WIDTH + this.position.x;
  }

  draw(){
    strokeWeight(1);
    stroke(color('rgb(0, 0, 0)'));
    fill(this.color);
    rect(this.cordiates.x, this.cordiates.y, STATE_SIZE.WIDTH, STATE_SIZE.HEIGHT);
    this.drawValue();
    this.drawPolicy();
  }

  drawValue(){
    if(this.type != STATE_TYPE.BRICK){
      noStroke();
      fill(color('rgb(0, 0, 0)'));
      if(this.type != STATE_TYPE.DEFAULT){
        fill(color('rgb(255, 255, 255)'));
      }
      text(this.value, this.cordiates.x + 5, this.cordiates.y + 5  , 100,100);
    }
  }

  setPolicy(policy_arr  = []){
    this.policy = {LEFT:false, UP:false, RIGHT:false, DOWN:false};
    for(var i = 0; i < policy_arr.length; i++){
      this.policy[Object.keys(this.policy)[policy_arr[i]]] = true;
    }

  }

  drawPolicy(){
    if(this.type != STATE_TYPE.BRICK){
      var dist = 20;
      strokeWeight(2);
      stroke(color('rgb(255, 0, 0)'));
      if(this.type == STATE_TYPE.DEFAULT){
        if(this.policy.RIGHT){
          line(this.cordiates.x + STATE_SIZE.WIDTH/2, this.cordiates.y + STATE_SIZE.HEIGHT/2, this.cordiates.x + STATE_SIZE.WIDTH - dist,  this.cordiates.y + STATE_SIZE.HEIGHT/2);
          ellipse(this.cordiates.x + STATE_SIZE.WIDTH - dist,  this.cordiates.y + STATE_SIZE.HEIGHT/2, 3);
        }
        if(this.policy.LEFT){
          line(this.cordiates.x + STATE_SIZE.WIDTH/2, this.cordiates.y + STATE_SIZE.HEIGHT/2, this.cordiates.x + dist,  this.cordiates.y + STATE_SIZE.HEIGHT/2);
          ellipse(this.cordiates.x + dist,  this.cordiates.y + STATE_SIZE.HEIGHT/2, 3);
        }
        if(this.policy.UP){
          line(this.cordiates.x + STATE_SIZE.WIDTH/2, this.cordiates.y + STATE_SIZE.HEIGHT/2, this.cordiates.x + STATE_SIZE.WIDTH/2,  this.cordiates.y + dist);
          ellipse(this.cordiates.x + STATE_SIZE.WIDTH/2,  this.cordiates.y + dist, 3);
        }
        if(this.policy.DOWN){
          line(this.cordiates.x + STATE_SIZE.WIDTH/2, this.cordiates.y + STATE_SIZE.HEIGHT/2, this.cordiates.x + STATE_SIZE.WIDTH/2,  this.cordiates.y + STATE_SIZE.HEIGHT - dist);
          ellipse(this.cordiates.x + STATE_SIZE.WIDTH/2,  this.cordiates.y + STATE_SIZE.HEIGHT - dist, 3);
        }
      }
    }
  }

  reset(){
    this.value = 0;
    this.type = STATE_TYPE.DEFAULT;
    this.setPolicy();
    this.setColor();
    this.setReward(0);
    this.setLegalActions();
  }

  loop(){
    this.draw();
  }
}
