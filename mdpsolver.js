
class MDPSolver{
  constructor(env, gamma = 0.9, beta = 0.0000000000000000001, iterations = 1000){
    this.env = env;
    this.iterations = iterations;
    this.gamma = gamma;
    this.beta = beta;
    this.values = new Array(this.env.states.length).fill(0);
    this.policy = [];
    this.values_to_update = [];
    this.policies_to_update = [];
  }

  value_iteration(){
    debugger
    var temp_values = new Array(this.env.states.length).fill(0);
    while(--this.iterations > 0 || this.absDiff(this.values, temp_values).reduce((a, b) => a + b, 0) > this.beta){
      debugger
      this.values_to_update.push(this.values = temp_values.slice());
      var temp_policies = [];
      for(var i = 0; i < this.env.states.length; i++){
        var state = this.env.states[i];
        var q_values = [];
        for(let action in state.legal_actions)
           q_values.push(this.q_value(state, action));
        temp_policies.push(this.argMax(q_values));
        temp_values[state.getMappedIndex()] = Math.max.apply(Math, q_values);
      }
      this.policies_to_update.push(temp_policies);
    }
    this.policy_improvement();
    this.env.updateValuesAndPolicy(this.values_to_update, this.policies_to_update);
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


  policy_improvement(){
    this.env.states.forEach((state, i) => {
        var q_values = [];
        for(let action in state.legal_actions)
             q_values.push(this.q_value(state, action));
        this.policy.push(this.argMax(q_values));
    });
  }

  argMax(arr) {
    if (arr.length === 0)
        return -1;
    var max_index = [];
    var max_element = arr[0];
    max_index.push(0);
    for(var i = 1; i < arr.length; i++){
      if(arr[i] > max_element){
        max_index = [];
        max_index.push(i);
        max_element = arr[i];
      }
      else if(arr[i] >= max_element){
        max_index.push(i);
        max_element = arr[i];
      }
    }
    return max_index;
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