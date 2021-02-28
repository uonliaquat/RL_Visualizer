
var generate_btn = document.getElementById('generate');
var width = 0;
var height = 0;
generate_btn.addEventListener("click", () => {
		width =  document.getElementById('cols').value;
		height =  document.getElementById('rows').value;
    window.location.href = `/RL_Visualizer/GridWorld/index.html?width=${width}&height=${height}`;
});
