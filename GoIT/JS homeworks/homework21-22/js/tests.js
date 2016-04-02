QUnit.test( 'generateQuestion', function( assert ) {

	myTest.generateQuestion(4);
	var testQuestion = $('.question h4').text();
	var testAnswers = $('.question__text').text().length;
	
	assert.equal( testQuestion, 'Butterflyes:', 'Question is generated' );
	assert.equal( testAnswers, 60, 'Answers are generated' );
	myTest.generateQuestion(0);
});

QUnit.test( 'Navigation', function( assert ) {

	// Trigger next button event

	$('#next').triggerHandler('click');
	var testQuestion = $('.question h4').text();
	var testAnswers = $('.question__text').text().length;
	
	assert.equal( testQuestion, 'Bees:', 'Next question is generated' );
	assert.equal( testAnswers, 60, 'Answers are generated' );
	
	// Trigger prev button event

	$('#prev').triggerHandler('click');
	testQuestion = $('.question h4').text();
	testAnswers = $('.question__text').text().length;
	assert.equal( testQuestion, 'Goats:', 'Prev question is generated' );
	assert.equal( testAnswers, 60, 'Answers are generated' );
});

QUnit.test( "Save & show results", function( assert ) {

	// Test property checked (answer 5 in first question)

	$('.question__item').eq(4).prop('checked', 'checked');
	myTest.saveAnswer();
	
	// saveAnswer function

	assert.ok( questions[0]['answer5'].check, 'Checked item saved' );
	assert.ok( !questions[0]['answer6'].check, 'Unchecked item remains untouched' );
	
	// generateOneResult function 
	
	assert.equal( myTest.generateOneResult(0).yourCount, 1, 'Correct result showed' );

	// Tested property cleared

	questions[0]['answer5'].check = undefined;
	myTest.generateQuestion(0);
});