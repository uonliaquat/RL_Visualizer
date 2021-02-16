
var generate_btn = document.getElementById('generate');
var width = 0;
var height = 0;
generate_btn.addEventListener("click", () => {
		width =  document.getElementById('cols').value;
		height =  document.getElementById('rows').value;
		console.log(width);
		console.log(height);
    window.location.href = `/GridWorld/index.html?width=${width}&height=${height}`;
});
