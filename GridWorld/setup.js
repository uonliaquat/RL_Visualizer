
var default_btn = document.getElementById('default_btn');
var selected_state_type = 0;
var gamma_value = 0;
var speed = 0;
var reward = 0;
var solver;

var gamma_slider = document.getElementById("gamma_range_slider");
var speed_slider = document.getElementById("speed_slider");
var reward_slider = document.getElementById("reward_slider");
var gamma_label = document.getElementById("gamma_label");
var speed_label = document.getElementById("speed_label");
var reward_label = document.getElementById("reward_label");
var brick_btn = document.getElementById('brick_btn');
var reward_btn =document.getElementById('reward_btn');
var toggle_value_iteration_btn =document.getElementById('toggle_value_iteration_btn');
var reset =document.getElementById('reset_btn');


function disable_buttons(){
	reward_btn.disabled = true;
	default_btn.disabled = true;
	brick_btn.disabled = true;
	gamma_slider.disabled = true;
	speed_slider.disabled= true;
	reward_slider.disabled = true;
	toggle_value_iteration_btn.disabled = true;
	reset_btn.disabled = true;
}
function enable_buttons(){
	reward_btn.disabled = false;
	default_btn.disabled = false;
	brick_btn.disabled = false;
	gamma_slider.disabled = false;
	speed_slider.disabled= false;
	reward_slider.disabled = false;
	toggle_value_iteration_btn.disabled = false;
		reset_btn.disabled = false;
}

default_btn.addEventListener("click", () => {
	selected_state_type = STATE_TYPE.DEFAULT;
});

brick_btn.addEventListener("click", () => {
		selected_state_type = STATE_TYPE.BRICK;
});

reward_btn.addEventListener("click", () => {
		if(reward < 0)
				selected_state_type = STATE_TYPE.PIT;
		else
				selected_state_type = STATE_TYPE.GOAL;
});

toggle_value_iteration_btn.addEventListener("click", () => {
	disable_buttons();
	solver = new MDPSolver(env, gamma_value, 0.00001, 100, speed);
	solver.value_iteration();
});

reset_btn.addEventListener("click", () => {
	solver = new MDPSolver(env, gamma_value, 0.00001, 100, speed);
	env.reset();
});


gamma_value = (gamma_slider.value/1000).toFixed(3);
gamma_label.innerHTML = gamma_value;


speed = speed_slider.value;
speed_label.innerHTML = speed + 'ms';


reward = reward_slider.value;
reward_label.innerHTML = reward;

gamma_slider.oninput = function() {
	gamma_value = this.value/1000;
  gamma_label.innerHTML = gamma_value;
}

speed_slider.oninput = function() {
	speed = this.value;
  speed_label.innerHTML = speed + 'ms';
}

reward_slider.oninput = function() {
	reward = this.value;
  reward_label.innerHTML = reward;
	if(reward < 0)
			selected_state_type = STATE_TYPE.PIT;
	else
			selected_state_type = STATE_TYPE.GOAL;
}
