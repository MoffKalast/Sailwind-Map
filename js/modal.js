var modals_open = 0;

class Modal{

	static open(modal_id) {
		document.getElementById(modal_id).style.display = "block";
		modals_open++;
	}

	static close(modal_id) {
		document.getElementById(modal_id).style.display = "none";
		modals_open--;
	}
}

window.addEventListener('click', function(event) {
	if(event.target.classList.contains("modal")) {
		event.target.style.display = "none";
		modals_open--;
	}
});