
var default_btn = document.getElementById('default_btn');
default_btn.addEventListener("click", () => {
	selected_state_type = STATE_TYPE.DEFAULT;
});


var brick_btn = document.getElementById('brick_btn');
brick_btn.addEventListener("click", () => {
		selected_state_type = STATE_TYPE.BRICK;
});

var pit_btn = document.getElementById('pit_btn');
pit_btn.addEventListener("click", () => {
		selected_state_type = STATE_TYPE.PIT;
});

var gold_btn =document.getElementById('goal_btn');
gold_btn.addEventListener("click", () => {
		selected_state_type = STATE_TYPE.GOAL;
});

var toggle_value_iteration_btn =document.getElementById('toggle_value_iteration_btn');
toggle_value_iteration_btn.addEventListener("click", () => {
	var solver = new MDPSolver(env);
	solver.value_iteration();
});
