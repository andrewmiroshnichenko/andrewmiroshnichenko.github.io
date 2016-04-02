'use strict';
var myTest = {
	numberOfQuestions: questions.length,
	questionIndex: 0,

		// Question generation

	generateQuestion: function (questionIndex) {
		$('.question').remove();
		var numberOfAnswers = Object.keys(questions[questionIndex]).length;
		var data = {};

		data.question = questions[questionIndex].question;
		for (var i = 1; i < numberOfAnswers; i++) {
			data['answer' + i] = questions[questionIndex]['answer' + i].text;
		}

		var html = $('#questionTemplate').html();
		$('.wrapper').prepend( tmpl(html, data) );
	},

	// Button handlers

	showPrevQuestion: function() {
		if (myTest.questionIndex > 0) {
			myTest.generateQuestion(--myTest.questionIndex);
		};
	},
	showNextQuestion: function() {
		if (myTest.questionIndex < myTest.numberOfQuestions - 1){
			myTest.generateQuestion(++myTest.questionIndex);
		};
	},
	saveAnswer:function() {
		var answersCount = Object.keys(questions[myTest.questionIndex]).length;
		
		for (var i = 0; i < answersCount - 1; i++) {
			if ( $('.question__item').eq(i).prop('checked') ){
				questions[myTest.questionIndex]['answer' + (i + 1)].check = true;
			};
		};
		// showNextQuestion();
	},
	generateOneResult: function(resultNumber) {
		var numberOfAnswers = Object.keys(questions[resultNumber]).length;
		var data = {
			correctCount: 0,
			yourCount: 0,
			result: '',
			question: questions[resultNumber].question
		}

		for (var i = 1; i < numberOfAnswers; i++) {
			if (questions[resultNumber]['answer' + i].correct) {
				data.result = data.result + ' & ' + questions[resultNumber]['answer' + i].text;
				data.correctCount += 1;
				if (questions[resultNumber]['answer' + i].check) {
					data.yourCount += 1;
				};
			}
		}
					
		data.result = data.result.slice(2);

		return data;
	},
	showResults: function() {
		console.log('a');
		$('<div class="results"></div>').appendTo('body');
		$('<h3>Corect answers</h3>').appendTo('.results');
		for (var j = 0; j < myTest.numberOfQuestions; j++) {
			var html = $('#resultsTemplate').html();
			$('.results').append( tmpl(html, myTest.generateOneResult(j)) );
		};
	}
}

	// linking button handlers

	myTest.generateQuestion(myTest.questionIndex);
	$('#prev').on('click', myTest.showPrevQuestion);
	$('#next').on('click', myTest.showNextQuestion);
	$('#save').on('click', myTest.saveAnswer);
	$('#compvare').on('click', myTest.showResults);