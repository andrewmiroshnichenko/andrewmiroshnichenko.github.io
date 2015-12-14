// function createNewField(newFieldName, newTagName, HTML, class) {
// 	var this.newFieldName = document.createElement('p');
// 	document.body.appendChild(newTagName);
// }


var startButton = document.createElement('p');
document.body.appendChild(startButton);
startButton.classList.add('redbox');
startButton.innerHTML = 'Start';
startButton.addEventListener("click", startTimer);

var timeTable = document.createElement('p');
document.body.appendChild(timeTable);
timeTable.innerHTML = '00:00:00:000';

var resetButton = document.createElement('p');
document.body.appendChild(resetButton);
resetButton.classList.add('redbox');
resetButton.innerHTML = 'Reset';
resetButton.addEventListener("click", resetTimer);

var zero = new Date(0, 0),
seconds = 0,
minutes = 0,
hours = 0,
timer,
time;


function DisplayTime() {
	zero.setMilliseconds( zero.getMilliseconds() + 4);
	var milliseconds = zero.getMilliseconds();

	// function checkOvercount(a, b){
	// 	if (a >= 60) {
	// 		a = 0;
	// 		b = ++b;
	// 	}
	// }
	// checkOvercount(seconds, minutes);
	// checkOvercount(minutes, hours);

	
		if ( milliseconds === 996) {
			seconds = ++seconds;
		} 
		if (seconds >= 60) {
			seconds = 0;
			minutes = ++minutes;
		} 
		if (minutes >= 60) {
			minutes = 0;
			hours = ++hours;
		} 
		if (seconds < 10) {
			secondsNum = '0' + seconds;
		} else {
			secondsNum = seconds;
		}
		if (minutes < 10) {
			minutesNum = '0' + minutes;
		} else {
			minutesNum = minutes;
		}
		if (hours < 10) {
			hoursNum = '0' + hours;
		} else {
			hoursNum = hours;
		}

	time = hoursNum + ':' + minutesNum + ':' + secondsNum + ':' + milliseconds;
	timeTable.innerHTML = time;
}

function startTimer(){
	startButton.classList.add('bluebox');
	startButton.classList.remove('greenbox');
	startButton.innerHTML = 'Pause';
	timer = setInterval(DisplayTime, 4);
	startButton.removeEventListener("click", startTimer);
	startButton.addEventListener("click", pauseTimer);
}

function pauseTimer(){
	startButton.classList.add('greenbox');
	startButton.innerHTML = 'Continue';
	clearInterval(timer);
	timeTable.innerHTML = time;
	startButton.removeEventListener("click", pauseTimer);
	startButton.addEventListener("click", startTimer);
}

function resetTimer(){
	startButton.classList.remove('greenbox', 'bluebox');
	startButton.innerHTML = 'Start';
	timeTable.innerHTML = '00:00:00:000';
	clearInterval(timer);
	startButton.removeEventListener("click", pauseTimer);
	startButton.addEventListener("click", startTimer);
	zero = new Date(0, 0);
	seconds = 0;
	minutes = 0;
	hours = 0;
}