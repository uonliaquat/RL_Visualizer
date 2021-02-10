const STATE_SIZE = {WIDTH:80, HEIGHT:80};
class State{
  constructor(type, position, value, policy){
    this.type = type;
    this.position = position;
    this.value = value
    this.polciy = policy;
    this.setColorValue();
  }

  isMouseInside(){
    if(mouseX > this.position.x && mouseX < this.position.x + STATE_SIZE.WIDTH && mouseY > this.position.y && mouseY < this.position.y + STATE_SIZE.HEIGHT) return true;
    return false;
  }


  setColorValue(){
    switch (this.type) {
      case STATE_TYPE.DEFAULT:
        this.color = 255;
        this.value = 0;
        break;
      case STATE_TYPE.BRICK:
        this.color = 0;
        break
      case STATE_TYPE.PIT:
        this.color = color('rgb(100,40,0)');
        this.value = -1;
        break;
      case STATE_TYPE.GOAL:
        this.color = color('rgb(0,0,200)');
        this.value = 1;
        break;
      default:
        break;
    }
  }

  setType(type){
    this.type = type;
    this.setColorValue();
  }

  draw(){
    strokeWeight(1);
    stroke(color('rgb(0, 0, 0)'));
    fill(this.color);
    rect(this.position.x, this.position.y, STATE_SIZE.WIDTH, STATE_SIZE.HEIGHT);
    this.drawValue();
    this.drawPolicy();
  }

  drawValue(){
    if(this.type != STATE_TYPE.BRICK){
      fill(color('rgb(200, 105, 00)'));
      text(this.value, this.position.x + 5, this.position.y + 5  , 100,100);
    }
  }

  drawPolicy(){
    if(this.type != STATE_TYPE.BRICK){
      var dist = 20;
      strokeWeight(2);
      stroke(color('rgb(255, 0, 0)'));
      //right
      line(this.position.x + STATE_SIZE.WIDTH/2, this.position.y + STATE_SIZE.HEIGHT/2, this.position.x + STATE_SIZE.WIDTH - dist,  this.position.y + STATE_SIZE.HEIGHT/2);
      ellipse(this.position.x + STATE_SIZE.WIDTH - dist,  this.position.y + STATE_SIZE.HEIGHT/2, 3);
      //left
      line(this.position.x + STATE_SIZE.WIDTH/2, this.position.y + STATE_SIZE.HEIGHT/2, this.position.x + dist,  this.position.y + STATE_SIZE.HEIGHT/2);
      ellipse(this.position.x + dist,  this.position.y + STATE_SIZE.HEIGHT/2, 3);
      //Up
      line(this.position.x + STATE_SIZE.WIDTH/2, this.position.y + STATE_SIZE.HEIGHT/2, this.position.x + STATE_SIZE.WIDTH/2,  this.position.y + dist);
      ellipse(this.position.x + STATE_SIZE.WIDTH/2,  this.position.y + dist, 3);
      //Down
      line(this.position.x + STATE_SIZE.WIDTH/2, this.position.y + STATE_SIZE.HEIGHT/2, this.position.x + STATE_SIZE.WIDTH/2,  this.position.y + STATE_SIZE.HEIGHT - dist);
      ellipse(this.position.x + STATE_SIZE.WIDTH/2,  this.position.y + STATE_SIZE.HEIGHT - dist, 3);
    }
  }

  loop(){
    this.draw();
  }
}
