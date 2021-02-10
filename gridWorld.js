const STATE_TYPE = {DEFAULT:0, BRICK:1, PIT:2, GOAL:3 }
var selected_state_type  = -1;
class GridWorld{
  constructor(size){
    this.size = size;
    this.states = [];
    for(var i = 0; i < size.width; i++){
      for(var j = 0; j < size.height; j++){
          var state = new State(STATE_TYPE.DEFAULT, {x:i*STATE_SIZE.HEIGHT,y:j*STATE_SIZE.WIDTH});
          this.states.push(state);
      }
    }
  }

  changeStateOnMouseDrag(){
    this.states.forEach((state, i) => {
      if(state.isMouseInside() && mouseIsPressed) state.setType(selected_state_type);
    });
  }

  draw(){
    this.states.forEach((state, i) => {
      state.loop();
    });
  }

  loop(){
    this.changeStateOnMouseDrag();
    this.draw();
  }
}
//
// function mouseDragged() {
//    console.log('7');
// }
