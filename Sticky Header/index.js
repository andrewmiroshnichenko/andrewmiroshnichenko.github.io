window.addEventListener('touchmove', showTop);
window.addEventListener('click', showClick);
var grayBar = document.querySelectorAll('.bar')[1];

function showTop() {
	var statisticsField = document.querySelector('.statistics');
	var string = document.createElement('span');
	grayBar.innerHTML = grayBar.getBoundingClientRect().top;
	statisticsField.appendChild(string);
	string.innerHTML = '+++++' + grayBar.getBoundingClientRect().top;
}

function showClick() {
	var statisticsField = document.querySelector('.statistics');
	var string = document.createElement('span');
	statisticsField.appendChild(string);
	// string.innerHTML = grayBar.getBoundingClientRect().top;
	grayBar.innerHTML = grayBar.getBoundingClientRect().top;
	string.innerHTML = 'click';
}


// function sticky(el, top) {

		
// 		var requiredOriginalStyles = ['position', 'top', 'left', 'z-index'];
// 		var grayBar = document.querySelectorAll('.bar')[1];
// 		console.log(grayBar);

// 		var requiredTop = top || 0;
// 		var originalRect = calcRect(el);
// 		var styles = {
// 			position: 'fixed',
// 			top: requiredTop + 'px',
// 			left: originalRect.left + 'px',
// 			// width: originalRect.width + 'px',
// 			'z-index': 9999
// 		}
// 		var originalStyles = {}
// 		requiredOriginalStyles.forEach(function(key) {
// 			originalStyles[key] = el.style[key];
// 		});

	// function calcRect(el) {
	// 	var rect = el.getBoundingClientRect();
	// 	var windowScroll = getWindowScroll();
	// 	return {
	// 		left: (document.documentElement.clientWidth - rect.width) / 2 + windowScroll.left,
	// 		top: rect.top + windowScroll.top,
	// 		width: rect.width,
	// 		height: rect.height
	// 	}
	// }
	// function getWindowScroll() {
	// 	return {
	// 		top: window.pageYOffset || document.documentElement.scrollTop,
	// 		left: window.pageXOffset || document.documentElement.scrollLeft
	// 	}
	// }