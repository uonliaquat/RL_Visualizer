
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
