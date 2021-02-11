
class MDPSolver{
  constructor(env, gamma = 0.9, beta = 0.000001, iterations = 100){
    this.env = env;
    this.iterations = iterations;
    this.gamma = gamma;
    this.beta = beta;
    this.values = new Array(this.env.states.length).fill(0);
    this.values_to_update = [];
  }

  value_iteration(){
    var temp_values = new Array(this.env.states.length).fill(0);
    var beta = 1;
    while(--this.iterations > 0 && beta > this.beta){
      this.values = temp_values.slice();
      this.values_to_update.push(this.values);
      for(var i = 0; i < this.env.states.length; i++){
        var q_values = [];
        for(let action in this.env.states[i].legal_actions){
          q_values.push(this.q_value(this.env.states[i], action));
        }
        temp_values[this.env.states[i].getMappedIndex()] = Math.max.apply(Math, q_values);
      }
      beta = this.absDiff(this.values, temp_values).reduce((a, b) => a + b, 0);
    }
    this.env.updateValues(this.values_to_update);
  }

  q_value(state, action){
    var reward = this.env.rewards[state.getMappedIndex()][this.env.actions[action]];
    if(state.type == STATE_TYPE.DEFAULT){
      var expected_future_reward = 0;
      for(var i = 0; i < this.env.states.length; i++){
        var prob = this.env.transitions[this.env.actions[action]][state.getMappedIndex()][this.env.states[i].getMappedIndex()];
        expected_future_reward = expected_future_reward + (prob * this.values[this.env.states[i].getMappedIndex()]);
      }
      return reward + (this.gamma * expected_future_reward);
    }
    return reward;
  }

  absDiff(arr1, arr2){
   const res = [];
   for(let i = 0; i < arr1.length; i++){
      const el = Math.abs((arr1[i] || 0) - (arr2[i] || 0));
      res[i] = el;
   };
   return res;
 }

}
