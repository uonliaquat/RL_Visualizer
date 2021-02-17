
class MDPSolver{
  constructor(env, gamma = 0.9, beta = 0.000001, iterations = 50, speed = 500){
    this.env = env;
    this.iterations = iterations;
    this.gamma = gamma;
    this.beta = beta;
    this.values = new Array(this.env.states.length).fill(0);
    this.policy = [];
    this.values_to_update = [];
    this.policies_to_update = [];
    this.speed = speed;
  }

  value_iteration(){
    var temp_values = new Array(this.env.states.length).fill(0);
    while(--this.iterations > 0 || this.absDiff(this.values, temp_values).reduce((a, b) => a + b, 0) > this.beta){
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
    debugger
    this.policy_improvement();
    this.env.updateValuesAndPolicy(this.values_to_update, this.policies_to_update, this.speed);
  }

  policy_iteration(){
    var temp_policy = this.random_poloicy();
    debugger
    while(--this.iterations > 0){
      for(var i = 0; i <12; i++){
          this.policy_evaluation(temp_policy);
          this.policies_to_update.push(temp_policy);
      }
      this.policy_improvement();
      temp_policy = this.policy.slice();
    }
    this.env.updateValuesAndPolicy(this.values_to_update, this.policies_to_update, this.speed);
  }

  policy_evaluation(policy){
    var temp_values = []
    this.env.states.forEach((state, i) => {
        temp_values.push(this.q_value(state, this.getKeyByValue(this.env.actions, policy[i][0])));
    });
    this.values_to_update.push(this.values = temp_values.slice());
  }

  random_poloicy(){
    var policy = [];
    for(var i = 0; i < this.env.states.length; i++){
      var temp = [];
      temp.push(Math.floor(Math.random() * 4));
      policy.push(temp);
    }
    return policy;
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
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
    this.policy = [];
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
