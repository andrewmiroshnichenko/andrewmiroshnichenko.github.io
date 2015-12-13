var p = document.createElement('p');
document.body.appendChild(p);
p.classList.add('redbox');
p.innerHTML = 'Start';
p.addEventListener("click", startTimer);

var timeTable = document.createElement('p');
document.body.appendChild(timeTable);
timeTable.innerHTML = '00:00:00:000';

var reset = document.createElement('p');
document.body.appendChild(reset);
reset.classList.add('redbox');
reset.innerHTML = 'Reset';
reset.addEventListener("click", resetTimer);

var zero = new Date(0, 0),
seconds = 0,
minutes = 0,
hours = 0,
timer,
time;


function DisplayTime() {
	zero.setMilliseconds( zero.getMilliseconds() + 4);
	var milliseconds = zero.getMilliseconds();

	
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
	return time;
}

function startTimer(){
	p.classList.add('bluebox');
	p.classList.remove('greenbox');
	p.innerHTML = 'Pause';
	timer = setInterval(DisplayTime, 4);
	p.removeEventListener("click", startTimer);
	p.addEventListener("click", pauseTimer);
}

function pauseTimer(){
	p.classList.add('greenbox');
	p.innerHTML = 'Continue';
	clearInterval(timer);
	timeTable.innerHTML = time;
	p.removeEventListener("click", pauseTimer);
	p.addEventListener("click", startTimer);
}

function resetTimer(){
	p.classList.remove('greenbox', 'bluebox');
	p.innerHTML = 'Start';
	timeTable.innerHTML = '00:00:00:000';
	clearInterval(timer);
	p.removeEventListener("click", pauseTimer);
	p.addEventListener("click", startTimer);
	zero = new Date(0, 0);
	seconds = 0;
	minutes = 0;
	hours = 0;
}