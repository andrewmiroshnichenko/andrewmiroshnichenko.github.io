var app = {
	generateNewElement: function(params) {
		if (params.newTagName) {
			var newElement = document.createElement(params.newTagName);
		}

		if (params.tagContent) {
			newElement.innerHTML = params.tagContent;
		}

		if (params.newClassName) {
			newElement.classList.add(params.newClassName);
		}

		if (params.tagId) {
			newElement.setAttribute('id', params.tagId);
		}

		if (params.inputType){
      		newElement.setAttribute('type', params.inputType);
    	}

    	if (params.tagValue){
      		newElement.setAttribute('value', params.tagValue);
    	}

		if (params.parentElement)
		params.parentElement.appendChild(newElement);

		return newElement;

	},

	generateQuestionsAndAnswers: function(questionsNum, answersNum) {
		for (var i = 0; i  < questionsNum; ++i) {

			this.generateNewElement({
				newTagName: 'p',
				newClassName: 'question',
				tagContent: (i + 1) +'. Вопрос №' + (i + 1),
				parentElement: form
				});


			for (var j = 0; j < answersNum; ++j) {
				var label = this.generateNewElement({
					newTagName: 'label',
					newClassName: 'answer',
					tagContent: 'Вариант ответа №' + (j + 1),
					parentElement: form
					});

				var checkbox = this.generateNewElement({
				    newTagName: 'input',
			        inputType: 'checkbox'
			    	});

					label.parentNode.insertBefore(checkbox, label);
				}
			
		}
	}
}

var body = document.querySelector('body');
// var questionsCount = +prompt('Введите количество вопросов', 2);
// var answersCount = +prompt('Введите количество ответов', 2);

app.generateNewElement({
	newTagName: 'h3',
	newClassName: '',
	tagContent: 'Тест по программированию',
	tagId:'',
	parentElement: body
});

var form = app.generateNewElement({
	newTagName: 'form',
	newClassName: '',
	tagContent: '',
	tagId:'',
	parentElement: body
});

app.generateQuestionsAndAnswers(2, 2);

app.generateNewElement({
	newTagName: 'input',
	newClassName: '',
	tagContent: 'sdfsdfsdf',
	tagId:'',
	tagValue: 'Проверить мои результаты',
	inputType: 'submit',
	parentElement: form
});