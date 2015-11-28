var number;
var power;
number = prompt('Enter number, please', null);
power = prompt('Enter power, please', null);
var result = 1;
var i;
for (i = 0; i < power; i++) {
	result = result*number;
}
	console.log('result = ', result);
