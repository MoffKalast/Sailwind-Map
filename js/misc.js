
//cursor indicator lines
window.onmousemove = function (element) {
	document.getElementById("horizCursorline").style.top = event.y;
	document.getElementById("vertCursorline").style.left = event.x;
};