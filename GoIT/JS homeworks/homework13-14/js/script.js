'use strict';
var questions = [
	{
		question: 'Goats are:',
		'answer1': 'with wings',
		'answer2': 'with fins',
		'answer3': 'Fishes'
		'answer4': 'Insects',
		'answer5': 'with paws',
		'answer6': 'Animals'
	}, 	{
		question: 'Bees are:',
		'answer1': 'Fishes',
		'answer2': 'Animals',
		'answer3': 'with fins',
		'answer4': 'with paws',
		'answer5': 'with wings',
		'answer6': 'Insects'
	}, 	{
		question: 'Bears are:',
		'answer1': 'with wings',
		'answer2': 'with fins',
		'answer3': 'Fishes'
		'answer4': 'Insects',
		'answer5': 'with paws',
		'answer6': 'Animals'
	}, 	{
		question: 'Sharks are:',
		'answer1': 'Animals',
		'answer2': 'with wings',
		'answer3': 'with paws',
		'answer4': 'Insects',
		'answer5': 'with fins',
		'answer6': 'Fishes'
	}, 	{
		question: 'Butterflyes are:',
		'answer1': 'Fishes',
		'answer2': 'Animals',
		'answer3': 'with fins',
		'answer4': 'with paws',
		'answer5': 'with wings',
		'answer6': 'Insects'
	}
];

localStorage.setItem('test', JSON.stringify(questions));
// var parsed = JSON.parse(localStorage.getItem('test'));
// console.log(parsed[1].answer1);

$(function(){

	// DOM creation

	var prevButton = $('<button>Previous question</button>');
	var saveAnswerButton = $('<button>Save answer</button>');
	var nextButton = $('<button>Next question</button>');
	var copleteTest  = $('<button>Complete test</button>');
	var confirm;
	var decline;

	prevButton.appendTo('body');
	saveAnswerButton.appendTo('body');
	nextButton.appendTo('body');
	copleteTest.appendTo('body');

	// Question 

	var questionIndex = 0;

	function generateQuestion(questionIndex) {
		$('.question').remove();
		var answer1Number, answer2Number, answer3Number;

		answer1Number = randomNumberFromRange(1, 6);

		(function generateAnswer2Number() {
			answer2Number = randomNumberFromRange(1, 6);
			if (answer2Number == answer1Number) {
				generateAnswer2Number();
			}
			return answer2Number;
		})();


		(function generateAnswer3Number() {
			answer3Number = randomNumberFromRange(1, 6);
			if (answer3Number == answer1Number || answer3Number == answer2Number) {
				generateAnswer3Number();
			}
			return answer3Number;
		})();

		var html = $('#questionTemplate').html();
		var content = tmpl(html, {
			question: questions[questionIndex].question,
			answer1: questions[questionIndex]['answer' + answer1Number],
			answer2: questions[questionIndex]['answer' + answer2Number],
			answer3: questions[questionIndex]['answer' + answer3Number],
			answer4: questions[questionIndex]['answer' + answer4Number],
			answer5: questions[questionIndex]['answer' + answer5Number],
			answer6: questions[questionIndex]['answer' + answer6Number]
		});
		$('body').prepend(content);

	};

	// Button handlers

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
			if (questionIndex == 7) {
				generateQuestion(questionIndex);
			} else if (questionIndex < 7) {
				questionIndex = questionIndex + 1;
				generateQuestion(questionIndex);
			}
			return false;
		});
	};

	var answersArray= [];

	function saveAnswer (){
		saveAnswerButton.on('click', function(){
			for (var i = 0; i < 3; i++) {
				if ( $( 'input' ).eq( i ).prop( 'checked' )) {
					var checked = $( 'input' ).eq( i ).next().html();
					if (checked === questions[questionIndex]['answer3']) {
						answersArray[questionIndex] = true;
					} else {
						answersArray[questionIndex] = false;
					};
				}
			};
		});
	};

	function showResults (){
		copleteTest.on('click', function() {
			console.log(answersArray);
		});
	};


	generateQuestion(questionIndex);
	showNextQuestion();
	showPrevQuestion();
	saveAnswer();
	showResults ();

	// Misc functions

	function randomNumberFromRange(min, max){
 	   return Math.floor(Math.random()*(max-min+1)+min);
	}

});