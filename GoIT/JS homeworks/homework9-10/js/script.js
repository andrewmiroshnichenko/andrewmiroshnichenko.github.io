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
    }).prependTo('body');

    function makeList (parentEl, ulClass, liClass, submenuLiIndex) {
		var index = (submenuLiIndex === undefined) ? ' ' : submenuLiIndex + ' ';
		var parent = (submenuLiIndex === undefined) ? parentEl : parentEl + ':eq( ' + submenuLiIndex + ' )';

	    $('<ul/>').prependTo( parent ).addClass(ulClass);

	    for (var i = 0; i < 5; i++) {
	    	$('<li/>', {
	    		'class': liClass,
	    	}).appendTo('.' + ulClass);

	    	$('<span/>', {
	    		'text': 'Nav' + index + i
	    	}).appendTo('.' + liClass + ':eq( ' + i + ' )');
	    };
    };

    makeList('.wrapper', 'first_level_ul', 'first_level_li');
    makeList('.first_level_li', 'second_level_ul', 'second_level_li', 2);
    makeList('.second_level_li', 'third_level_ul', 'third_level_li', 3);

    $('.test-field').insertAfter('.wrapper').show();
    
    // Handlers

    function listHandler(captionEl, event, startAnimateEl, interval, timeout, value) {
	    $(captionEl).on(event, function() {
	    	if (startAnimateEl.indexOf('first')) {
	    		$(startAnimateEl).parent().show();
	    	}
	    	var animateObject = $(startAnimateEl);
	    		animateObject.animate({height: value}, interval);
	    	if (startAnimateEl.indexOf('first') !== -1) {
	    		var creator = setInterval(function(){
	    			animateObject = animateObject.next();
	    			animateObject.animate({height: value}, interval);
	    		}, interval);
	    	} else if (startAnimateEl.indexOf('first') == -1) {
	    		var creator = setInterval(function(){
	    			animateObject = animateObject.prev();
		    		animateObject.animate({height: value}, interval);
	    		}, interval);
		 	}
	    	// setTimeout(function(){
	    	// 	clearInterval(creator);
	    	// }, timeout);
	    	return false;
	    });
    };

    var firstLiIn = listHandler('.first_level_li:eq( 2 )', 'mouseenter', '.second_level_li:first-child', 50, 6000, 20);
    var firstLiOut = listHandler('.first_level_li:eq( 2 )', 'mouseleave', '.second_level_li:last-child', 50, 6000, 0);
    var secondLiIn = listHandler('.second_level_li:eq( 3 )', 'mouseenter', '.third_level_li:first-child', 50, 6000, 20);
    var secondLiOut = listHandler('.second_level_li:eq( 3 )', 'mouseleave', '.third_level_li:last-child', 50, 6000, 0);


    // Misc (button handler)

    // $('#testbox').addClass('buddy');
   	// alert($('#testbox').prop('checked'));

    $('button').on('click', function() {
		if ($('#checkbox1').prop('checked')) {
    			$('#ms-my-select').show(); 
    		} else if ($('#checkbox2').is(':checked')) {
    			$('.checkbox-css').show();
    		}
    	alert($('#checkbox1').prop('checked'));
    	return false;
    });
});