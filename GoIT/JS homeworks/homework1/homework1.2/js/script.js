var namesList = [];
var i = 0;
while (i < 5) {
	namesList[i] = prompt('Enter name, please', null);
	i++;
}
var yourName;
yourName = prompt('Enter your name, sir or madam');

// console.log (typeof(yourName));
// if (typeof(yourName) != 'string') {
// 	alert('valid name, please');
// }

for (i = 0; i < 5; i++) {
	if (yourName == namesList[i]) {
		alert(yourName + ', вы успешно вошли');
		break;
	} 
}

console.log('i = ', i);
if (i >= 5) {
	alert('Ошибочка вышла');
}