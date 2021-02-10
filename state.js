const STATE_SIZE = {WIDTH:50, HEIGHT:50};
class State{
  constructor(type, position, value){
    this.type = type;
    this.position = position;
    this.value = value
    this.changeColor();
  }

  isMouseInside(){
    if(mouseX > this.position.x && mouseX < this.position.x + STATE_SIZE.WIDTH && mouseY > this.position.y && mouseY < this.position.y + STATE_SIZE.HEIGHT) return true;
    return false;
  }


  changeColor(){
    switch (this.type) {
      case STATE_TYPE.DEFAULT:
        this.color = 255;
        break;
      case STATE_TYPE.BRICK:
        this.color = 0;
        break;
      case STATE_TYPE.PIT:
        this.color = color(255, 204, 0);
        break;
      case STATE_TYPE.PIT:
        this.color = color('rgb(255,0,0)');
        break;
      case STATE_TYPE.GOAL:
        this.color = color('rgb(0,0,255)');
        break;
      default:
        break;
    }
  }

  setType(type){
    this.type = type;
    this.changeColor();
  }

  draw(){
    fill(this.color);
    rect(this.position.x, this.position.y, STATE_SIZE.WIDTH, STATE_SIZE.HEIGHT);
  }

  loop(){
    this.draw();
  }
}
