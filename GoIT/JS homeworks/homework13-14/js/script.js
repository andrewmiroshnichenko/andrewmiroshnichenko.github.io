'use strict';
var questions = [
	{
		question: 'Goats:',
		'answer1': {
			text: 'have wings',
			correct: false
		},
		'answer2': {
			text: 'have fins',
			correct: false
		},
		'answer3': {
			text: 'are Fishes',
			correct: false
		},
		'answer4': {
			text: 'are Insects',
			correct: false
		},
		'answer5': {
			text: 'have paws',
			correct: true
		},
		'answer6': {
			text: 'are Animals',
			correct: true
		}
	}, 	
	{
		question: 'Bees:',
		'answer1': {
			text: 'are Fishes',
			correct: false
		},
		'answer2': {
			text: 'are Animals',
			correct: false
		},
		'answer3': {
			text: 'have fins',
			correct: false
		},
		'answer4': {
			text: 'have paws',
			correct: false
		},
		'answer5': {
			text: 'have wings',
			correct: true
		},
		'answer6': {
			text: 'are Insects',
			correct: true
		}
	}, 	
	{
		question: 'Bears:',
		'answer1': {
			text: 'have wings',
			correct: false
		},
		'answer2': {
			text: 'have fins',
			correct: false
		},
		'answer3': {
			text: 'are Fishes',
			correct: false
		},
		'answer4': {
			text: 'are Insects',
			correct: false
		},
		'answer5': {
			text: 'have paws',
			correct: true
		},
		'answer6': {
			text: 'are Animals',
			correct: true
		}
	},
	{
		question: 'Sharks:',
		'answer1': {
			text: 'are Animals',
			correct: false
		},
		'answer2': {
			text: 'have wings',
			correct: false
		},
		'answer3': {
			text: 'have paws',
			correct: false
		},
		'answer4': {
			text: 'are Insects',
			correct: false
		},
		'answer5': {
			text: 'have fins',
			correct: true
		},
		'answer6': {
			text: 'are Fishes',
			correct: true
		}
	},
	{
		question: 'Butterflyes:',
		'answer1': {
			text: 'are Fishes',
			correct: false
		},
		'answer2': {
			text: 'are Animals',
			correct: false
		},
		'answer3': {
			text: 'have fins',
			correct: false
		},
		'answer4': {
			text: 'have paws',
			correct: false
		},
		'answer5': {
			text: 'have wings',
			correct: true
		},
		'answer6': {
			text: 'are Insects',
			correct: true
		}
	}
];

var numberOfQuestions = questions.length;

localStorage.setItem('test', JSON.stringify(questions));
// var parsed = JSON.parse(localStorage.getItem('test'));
// console.log(parsed[1].answer1);

$(function(){

	// DOM creation

	var questionWrap = $('<div class="wrapper"></div>');
	var buttonsWrap = $('<div class="btn_wrapper"></div>');
	var prevButton = $('<button>Previous question</button>');
	var saveAnswerButton = $('<button>Save answer</button>');
	var nextButton = $('<button>Next question</button>');
	var copleteTest  = $('<button>Complete test</button>');
	var confirm;
	var decline;

	questionWrap.appendTo('body');
	buttonsWrap.appendTo('body');
	prevButton.appendTo('.btn_wrapper');
	nextButton.appendTo('.btn_wrapper');
	saveAnswerButton.appendTo('.btn_wrapper');
	copleteTest.appendTo('.btn_wrapper');

	// Question 

	var questionIndex = 0;

	function generateQuestion(questionIndex) {
		$('.question').remove();

		var numberOfAnswers = Object.keys(questions[questionIndex]).length;

		var data = {};
		data.question = questions[questionIndex].question;
		for (var i = 1; i < numberOfAnswers; i++) {
			data['answer' + i] = questions[questionIndex]['answer' + i].text;
		}

		var html = $('#questionTemplate').html();
		$('.wrapper').prepend( tmpl(html, data) );
	};

	// Button handlers

	function showPrevQuestion() {
		if (questionIndex > 0) {
			generateQuestion(--questionIndex);
		};

		return false;
	};

	function showNextQuestion(){
		if (questionIndex < numberOfQuestions - 1){
			generateQuestion(++questionIndex);
		};

		return false;
	};


	function saveAnswer(){
		var answersCount = Object.keys(questions[questionIndex]).length;
		
		for (var i = 0; i < answersCount; i++) {
			if ( $( 'input' ).eq( i ).prop( 'checked' ) ){
				questions[questionIndex]['answer' + (i + 1)].check = true;
			};
		};
		showNextQuestion();
		return false;
	};
	prevButton.on('click', showPrevQuestion);
	nextButton.on('click', showNextQuestion);
	saveAnswerButton.on('click', saveAnswer);

	function showResults(){
		copleteTest.on('click', function() {
			$('<div class="results"></div>').appendTo('body');
			$('<h3>Corect answers</h3>').appendTo('.results');
			for (var j = 0; j < numberOfQuestions; j++) {
				(function () {
					var numberOfAnswers = Object.keys(questions[j]).length;

					var data = {
						correctCount: 0,
						yourCount: 0,
						result: '',
						question: questions[j].question
					}

					for (var i = 1; i < numberOfAnswers; i++) {
						if (questions[j]['answer' + i].correct) {
							data.result = data.result + ' & ' + questions[j]['answer' + i].text;
							data.correctCount += 1;
							if (questions[j]['answer' + i].check) {
								data.yourCount += 1
							};
						}
					}
					
					data.result = data.result.slice(2);

					var html = $('#resultsTemplate').html();
					$('.results').append( tmpl(html, data) );
				})();
			};
		});
	};

	generateQuestion(questionIndex);
	showNextQuestion();
	showPrevQuestion();
	saveAnswer();
	showResults();

});