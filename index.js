
var generate_btn = document.getElementById('generate');
var width = 0;
var height = 0;
generate_btn.addEventListener("click", () => {
		width =  document.getElementById('cols').value;
		height =  document.getElementById('rows').value;
		if(width > 20 || height > 20) return alert('Width and Height must be less than or equal to 20'); 
    window.location.href = `/GridWorld/index.html?width=${width}&height=${height}`;
});
