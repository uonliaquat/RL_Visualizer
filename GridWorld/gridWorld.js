const STATE_TYPE = {DEFAULT:0, BRICK:1, PIT:2, GOAL:3 }
var GRID_SIZE;
class GridWorld{
  constructor(size){
    GRID_SIZE = size;
    this.states = [];
    for(var i = 0; i < GRID_SIZE.HEIGHT; i++){
      for(var j = 0; j < GRID_SIZE.WIDTH; j++){
          var state = new State(STATE_TYPE.DEFAULT, {x:j*STATE_SIZE.WIDTH,y:i*STATE_SIZE.HEIGHT}, {x:j, y:i});
          this.states.push(state);
      }
    }
    this.actions = {LEFT:0, UP:1, RIGHT:2, DOWN:3};
    this.setRewards();
    this.setTransitionProbabilities();

  }

  setRewards(){
    this.rewards = [];
    this.states.forEach((state, i) => {
        var state_rewards = [];
        for(var i = 0; i < Object.keys(this.actions).length; i++){
          state_rewards.push(state.value);
        }
        this.rewards.push(state_rewards);
    });
  }

  setTransitionProbabilities(){
    this.transitions = [];
    for(let key in this.actions){
      var transitionMatrix = [];
      this.states.forEach((state, i) => {
        var row = new Array(this.states.length).fill(0);
        row[this.next_state(state, this.actions[key]).getMappedIndex()] += 0.8
        row[this.next_state(state, this.get_action(this.actions[key] - 1)).getMappedIndex()] += 0.1
        row[this.next_state(state, this.get_action(this.actions[key] + 1)).getMappedIndex()] += 0.1
        transitionMatrix.push(row);
      });
      this.transitions.push(transitionMatrix);
    }
  }

  get_action(action){
    switch (action) {
      case 4:
        return this.actions.LEFT;
      case -1:
        return this.actions.DOWN;
      default:
        return action;
    }
  }


  next_state(state, action){
    var next_state;
    switch (action) {
      case this.actions.LEFT:
        next_state = this.states[this.map_index(Math.max(0, state.position.x - 1), state.position.y)];
        break;
      case this.actions.UP:
        next_state = this.states[this.map_index(state.position.x, Math.max(0, state.position.y - 1))];
        break;
      case this.actions.RIGHT:
        next_state = this.states[this.map_index(Math.min(GRID_SIZE.WIDTH - 1, state.position.x + 1), state.position.y)];
        break;
      case this.actions.DOWN:
        next_state = this.states[this.map_index(state.position.x, Math.min(GRID_SIZE.HEIGHT - 1, state.position.y + 1))];
        break;
      default:
        return null;
    }
    return next_state.type == STATE_TYPE.BRICK ? state: next_state;
  }

  get_index(state_index){
     var x = state_index % GRID_SIZE.WIDTH;
     var y = Math.floor(state_index / GRID_SIZE.WIDTH);
     return [x, y];
  }
  map_index(x, y){
     return y * GRID_SIZE.WIDTH + x;
  }

  changeStateOnMouseDrag(){
    this.states.forEach((state, i) => {
      if(state.isMouseInside() && mouseIsPressed) {
        state.setType(selected_state_type);
        state.setColor();
        state.setReward(+reward);
      };
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

  update(){
    this.states.forEach((state, i) => {
      state.setLegalActions();
    });
    this.setRewards();
    this.setTransitionProbabilities();
  }

  reset(){
    for(var i = 0; i < GRID_SIZE.HEIGHT * GRID_SIZE.WIDTH; i++)
        this.states[i].reset();
    this.setRewards();
    this.setTransitionProbabilities();
  }

  updateValuesAndPolicy(values, policies, speed){
    var states = this.states;
    for(var j = 0; j < values.length; j++){
      setTimeout(function() {
        states.forEach((state, i) => {
          state.value = values[0][i].toFixed(2);
          if(state.type == STATE_TYPE.DEFAULT)
              state.color = color(255, 255, (255 * (1-  state.value)));
          state.setPolicy(policies[0][i]);
        });
        values.shift();
        policies.shift();
      }, j * speed);
    }
    setTimeout(function(){
        enable_buttons();
    }, values.length * speed);
  }
}
