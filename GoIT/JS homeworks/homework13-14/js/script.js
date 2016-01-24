'use strict';
var questions = [
	{
		question: 'Goats are:',
		answer1: 'Insects',
		answer2: 'Fishes',
		answer3: 'Animals'
	}, 	{
		question: 'Bees are:',
		answer1: 'Fishes',
		answer2: 'Animals',
		answer3: 'Insects'
	}, 	{
		question: 'Bears are:',
		answer1: 'Fishes',
		answer2: 'Insects',
		answer3: 'Animals'
	}, 	{
		question: 'Sharks are:',
		answer1: 'Animals',
		answer2: 'Insects',
		answer3: 'Fishes'
	}, 	{
		question: 'Butterflyes are:',
		answer1: 'Animals',
		answer2: 'Fishes',
		answer3: 'Insects'
	}
];

localStorage.setItem('test', JSON.stringify(questions));
// var parsed = JSON.parse(localStorage.getItem('test'));
// console.log(parsed[1].answer1);

$(function(){

	// DOM creation

	var prevButton = $('<button>Previous question</button>');
	var answer = $('<button>Save answer</button>');
	var nextButton = $('<button>Next question</button>');
	// var copleteTest  = $('<button>Complete test</button>');
	var confirm;
	var decline;

	prevButton.appendTo('body');
	answer.appendTo('body');
	nextButton.appendTo('body');
	// copleteTest.appendTo('body');

	// Question 

	var questionIndex = 2;

	function generateQuestion(questionIndex) {
		$('.question').remove();
		var html = $('#questionTemplate').html();
		var content = tmpl(html, {
			data: questions[questionIndex]
		});
		$('body').prepend(content);

	};

	function showPrevQuestion (){
		prevButton.on('click', function(){
			if (questionIndex == 0) {
				generateQuestion(questionIndex);
			} else if (questionIndex > 0) {
				questionIndex = questionIndex - 1;
				generateQuestion(questionIndex);
			}
			return false;
		});
	};

	function showNextQuestion (){
		nextButton.on('click', function(){
			if (questionIndex == 4) {
				generateQuestion(questionIndex);
			} else if (questionIndex < 4) {
				questionIndex = questionIndex + 1;
				generateQuestion(questionIndex);
			}
			return false;
		});
	};
	generateQuestion(questionIndex);
	showNextQuestion();
	showPrevQuestion();


	// randomNumberFromRange(minNumber, maxNumber);

	function randomNumberFromRange(min, max)	{
 	   return Math.floor(Math.random()*(max-min+1)+min);
    // do whatever with randomNumber...
	}

	var number = randomNumberFromRange(0, 2);

	console.log(number);

});