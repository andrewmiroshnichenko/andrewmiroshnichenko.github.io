window.addEventListener('touchstart', showStart);
window.addEventListener('touchmove', showMove);
window.addEventListener('touchend', showEnd);
window.addEventListener('touchcancel', showCancel);
window.addEventListener('click', showClick);
window.onscroll = function(e) {
	e.preventDefault();
}
var grayBar = document.querySelectorAll('.bar')[1];
	var initialOffset = grayBar.getBoundingClientRect().top;
// grayBar.style.opacity = '1';
// var container = document.querySelector('.container');

var genClick = new Event('click');
var genFocus = new Event('focus');
var genTouchStart = new Event('touchstart');
var genTouchEnd = new Event('touchend');

function showStart() {
	var statisticsField = document.querySelector('.statistics');
	var string = document.createElement('span');
	grayBar.innerHTML = Math.floor(grayBar.getBoundingClientRect().top);
	statisticsField.appendChild(string);
	string.innerHTML = '+++' + Math.floor(grayBar.getBoundingClientRect().top) + '___start';
}

function showMove(e) {
	var statisticsField = document.querySelector('.statistics');
	var string = document.createElement('span');
	// grayBar.innerHTML = initialOffset -  window.pageYOffset;
	grayBar.innerHTML = findCoords();
	statisticsField.appendChild(string);
	// container.replaceChild(grayBar, grayBar);
	// grayBar.style.opacity =  +grayBar.style.opacity - +'0.02' + '';
	// string.innerHTML = '+++++' + window.pageYOffset + '___move';
	string.innerHTML = '+++++' + Math.floor(grayBar.getBoundingClientRect().top) + '___move';
	// window.dispatchEvent(genClick);
	// window.dispatchEvent(genTouchEnd);
	// window.dispatchEvent(genTouchStart);
	// console.log(e.changedTouches[0].clientY);
}

function findCoords() {
	return Math.floor(grayBar.getBoundingClientRect().top);
}

function showEnd() {
	var statisticsField = document.querySelector('.statistics');
	var string = document.createElement('span');
	grayBar.innerHTML = Math.floor(grayBar.getBoundingClientRect().top);
	statisticsField.appendChild(string);
	string.innerHTML = '+++++' + Math.floor(grayBar.getBoundingClientRect().top) + '___end';
}

function showCancel() {
	var statisticsField = document.querySelector('.statistics');
	var string = document.createElement('span');
	grayBar.innerHTML = Math.floor(grayBar.getBoundingClientRect().top);
	statisticsField.appendChild(string);
	string.innerHTML = '+++++' + Math.floor(grayBar.getBoundingClientRect().top) + '___cancel';
}

function showClick(e) {
	e.preventDefault();
	var statisticsField = document.querySelector('.statistics');
	var string = document.createElement('span');
	statisticsField.appendChild(string);
	// grayBar.style.opacity =  +grayBar.style.opacity - +'0.02' + '';
	// string.innerHTML = grayBar.getBoundingClientRect().top;
	// grayBar.innerHTML = grayBar.getBoundingClientRect().top;
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