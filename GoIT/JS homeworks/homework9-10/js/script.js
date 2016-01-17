$(document).ready(function() {
	
	// Owl carousel

	$("#owl").owlCarousel({
		autoPlay: 3000, //Set AutoPlay to 3 seconds
        items : 3,
        itemsDesktop : [1199,2],
       itemsDesktopSmall : [979,2]
    });

	// Multiply custom select
    
    $('#my-select').selectMultiple();

    // Drop-down menu

    // DOM creation

    $('<div/>', {
    	'class': 'wrapper',
    }).appendTo('body');



    $('<ul/>').appendTo('.wrapper').addClass('first_level_ul');

    for (var i = 0; i < 5; i++) {
    	$('<li/>', {
    		'class': 'first_level_li',
    	}).appendTo('.first_level_ul');

    	$('<span/>', {
    		'text': 'Nav ' + i
    	}).appendTo('.first_level_li:eq( ' + i + ' )');
    };



    $('<ul/>', {
    	'class': 'second_level_ul'
    }).appendTo('.first_level_li:eq( 2 )');

    for (var i = 0; i < 5; i++) {
    	$('<li/>', {
    	'class': 'second_level_li'
    	}).appendTo('.second_level_ul');

    	$('<span/>', {
    		'text': 'Nav 2.' + i
    	}).appendTo('.second_level_li:eq( ' + i + ' )');
    };



    $('<ul/>', {
    	'class': 'third_level_ul'
    }).appendTo('.second_level_li:eq( 3 )');

    for (var i = 0; i < 5; i++) {
    	$('<li/>', {
    	'class': 'third_level_li'
    	}).appendTo('.third_level_ul');

    	$('<span/>', {
    		'text': 'Nav 2.3.' + i
    	}).appendTo('.third_level_li:eq( ' + i + ' )');
    };

    $('.test-field').appendTo('body').show();

    
    // Handlers


    $('.first_level_li:eq( 2 )').on('mouseenter', function() {
    	var animateObject = $('.second_level_li:first-child');
    		animateObject.animate({height: 20}, 100);
    	var interval = setInterval(function(){
    		animateObject = animateObject.next();
    		animateObject.animate({height: 20}, 100);
    		console.log(animateObject);
    	}, 100);
    	setTimeout(function(){
    		clearInterval(interval);
    	}, 600);
    });

    $('.first_level_li:eq( 2 )').on('mouseleave', function() {
    	var animateObject = $('.second_level_li:last-child');
    		animateObject.animate({height: 0}, 100);
    	var interval = setInterval(function(){
    		animateObject = animateObject.prev();
    		animateObject.animate({height: 0}, 100);
    		console.log(animateObject);
    	}, 100);
    	setTimeout(function(){
    		clearInterval(interval);
    	}, 600);
    });



    $('.second_level_li:eq( 3 )').on('mouseenter', function() {
    	$('.third_level_ul').show();
    	var animateObject = $('.third_level_li:first-child');
    		animateObject.animate({height: 20}, 100);
    	var interval = setInterval(function(){
    		animateObject = animateObject.next();
    		animateObject.animate({height: 20}, 100);
    		console.log(animateObject);
    	}, 100);
    	setTimeout(function(){
    		clearInterval(interval);
    	}, 600);
    });

    $('.second_level_li:eq( 3 )').on('mouseleave', function() {
    	var animateObject = $('.third_level_li:last-child');
    		animateObject.animate({height: 0}, 100);
    	var interval = setInterval(function(){
    		animateObject = animateObject.prev();
    		animateObject.animate({height: 0}, 100);
    		console.log(animateObject);
    	}, 100);
    	setTimeout(function(){
    		clearInterval(interval);
	    	$('.third_level_ul').hide();

    	}, 600);
    });
});