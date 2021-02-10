const STATE_SIZE = {WIDTH:80, HEIGHT:80};
class State{
  constructor(type, cordiates, position, policy){
    this.type = type;
    this.cordiates = cordiates;
    this.policy = policy;
    this.position = position;
    this.value = 0;
    this.setColorValue();
    this.setActions();
  }

  isMouseInside(){
    if(mouseX > this.cordiates.x && mouseX < this.cordiates.x + STATE_SIZE.WIDTH && mouseY > this.cordiates.y && mouseY < this.cordiates.y + STATE_SIZE.HEIGHT) return true;
    return false;
  }


  setColorValue(){
    switch (this.type) {
      case STATE_TYPE.DEFAULT:
        this.color = 255;
        break;
      case STATE_TYPE.BRICK:
          this.color = color('rgb(0,0,0)');
        break
      case STATE_TYPE.PIT:
        this.value = -1;
        this.color = color('rgb(100,40,0)');
        break;
      case STATE_TYPE.GOAL:
        this.value = 1;
        this.color = color('rgb(0,0,200)');
        break;
      default:
        break;
    }
  }

  setType(type){
    this.type = type;
    this.setColorValue();
  }

  setActions(){
    if(this.type == STATE_TYPE.DEFAULT) return {LEFT:0, UP:1, RIGHT:2, DOWN:3};
    return {RIGHT:2};
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
      fill(color('rgb(200, 105, 00)'));
      text(this.value, this.cordiates.x + 5, this.cordiates.y + 5  , 100,100);
    }
  }

  drawPolicy(){
    if(this.type != STATE_TYPE.BRICK){
      var dist = 20;
      strokeWeight(2);
      stroke(color('rgb(255, 0, 0)'));
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

  loop(){
    this.draw();
  }
}
