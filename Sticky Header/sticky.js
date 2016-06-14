window.onload = function() {
	var container = document.querySelector('.container');
	var sticky = document.querySelector('.fixedsticky');
	var placeholder = document.querySelector('.placeholder');
	var	top = sticky.getBoundingClientRect().top;
	var agent = navigator.userAgent;

	// Detect Chrome and apply position: fixed 
	if (agent.match(/chrome/i)) {
		container.addEventListener('scroll', move);
	}

	function move() {
		var scrolled = container.scrollTop;
		// sticky.lastElementChild.innerHTML = scrolled + '-----' + top;
		if (scrolled > top) {
			sticky.style.position = 'fixed';
			placeholder.style.display = 'block';
		} else if (scrolled < top) {
			placeholder.style.display = 'none';
			sticky.style.position = 'static';

		}
	}
}