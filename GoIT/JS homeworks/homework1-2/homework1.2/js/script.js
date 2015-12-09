var namesList = [];
var i = 0;
while (i < 5) {
	namesList[i] = prompt('Enter name, please', null);
	i++;
}
var yourName;
yourName = prompt('Enter your name, sir or madam');
var flag = false;

// Было до вебинара
// for (i = 0; i < namesList.length; i++) {
// 	if (yourName === namesList[i]) {
// 		alert(yourName + ', вы успешно вошли');
// 		break;
// 	} 
// }

// console.log('i = ', i);
// if (i >= 5) {
// 	alert('Ошибочка вышла');
// }

for (var i = 0; i < namesList.length; i++) {
	if (yourName === namesList[i]) {
		flag = true;
		break;
	} 
}

if (flag) {
	alert(namesList[i] + ', вы успешно вошли')
} else {
	alert('Пользователя ' + yourName + ' не существует')
}