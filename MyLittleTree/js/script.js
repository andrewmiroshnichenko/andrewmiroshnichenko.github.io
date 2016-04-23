var level0 = {}; 			 // Root of tree JSON object
var flatObjects = [];		 // Objects for categories with assigned id's
var results = []; 			 // Results of user's choice. They are formed when "I make my decision" button fires
var checkedBoxes = [];		 //
var login;					 // User's login

// Preparing JSON for tree generation

level0.id = 0;
level0.parents = undefined;
level0.item = [];

function defineRoot(parentObject) {

	_.forEach(data, function(object) {
		var cell = new Cell(object);
		if ((cell.parents === parentObject.parents) && (parentObject.id === 0)) {
			cell.id = parentObject.item.length + 1;
			parentObject.item.push(cell);
			flatObjects.push(cell);
			defineRoot(cell);
		} else 
		if (cell.parents === parentObject.name) {
			cell.id = parentObject.id + '' + (parentObject.item.length + 1);
			parentObject.item.push(cell);
			flatObjects.push(cell);
			defineRoot(cell);
		}
	});

	if (parentObject.item == '') {
		delete parentObject.item;
	}
}

function Cell(object) {
		this.text = object.title;
		this.name = object.alias;
		this.parents = object.parents[0];
		this.item = [];
}

defineRoot(level0);
console.log(level0);

// Save results button handler
$('.save-results').on('click', function(e) {
	
	// This just ensures that every time button clicked user gets appropriates results array

	results = [];
	e.preventDefault();

	// Collect information about checked boxes

	var imageState = $('.dhx_bg_img_fix').css('background-image');
	imageState = _
				  .chain(imageState)
				  .split('/')
				  .initial()
				  .join('/')
				  .value();

	$('.dhx_bg_img_fix').each(function() {
		if ( $(this).css('background-image') === imageState + '/iconCheckAll.gif")'){
			$(this).parent().siblings().each(function(){
				if ($(this).children().html() !== '&nbsp;') {
					var title = $(this).children().html().replace(/&amp;/g, '&');
					findChecked(title);
				}
			})
		}
	});

	// There should be POST of JSON data to php file, but I only form JSON instance called "object"
	// in format of {"name": userLogin, results: arrayOfAliases}

	var newUserDataObject = new NewUserData(login, results);
	newUserDataObject = JSON.stringify(newUserDataObject);
	console.log(newUserDataObject);
	$.post('../MyLittleTree/php/users.php', { object:  newUserDataObject}, function(result){});
});

// Just declaration of function that creates JSON in previous few strings
function NewUserData(login, results) {
		
		this.name = login;
		this.results = results;

};

// Get data from JSON file in POST HTTP request
function CheckedBoxes(categories) {

		var checkedBoxesIds = [];
		_.forEach(flatObjects, function(object) {
			_.forEach(categories, function(arrayItem) {
				if (arrayItem === object.name) {
					checkedBoxesIds.push(object.id);
				}
			});
		});
		return checkedBoxesIds;

}

// This searches for checked boxes and populates results
function findChecked(category) {
		_.forEach(data, function(dataObject) {
			if (dataObject.title == category) {
				results.push(dataObject.alias);
			}
		})

}

function previouslySeletedBreadCrumbs() {

		// Creating breadcrumbs

		var title = '';
		var totalHtml = '';
		var imageState = $('.dhx_bg_img_fix').css('background-image');
		imageState = _
					  .chain(imageState)
					  .split('/')
					  .initial()
					  .join('/')
					  .value();

		// Searching root

		$('.dhx_bg_img_fix').each(function() {
			if ( $(this).css('background-image') === imageState + '/iconCheckAll.gif")' ) {
				$(this).parent().siblings().each(function(){
					if ($(this).children().html() !== '&nbsp;') {
						title = $(this).children().html().replace(/&amp;/g, '&');
						totalHtml = ' > ' + '<strong>' + title + '</strong>';
						findBreadCrumb(title, totalHtml);
						totalHtml = '';
					}
				})
			} 
		});

}

// Searching parents of the root
function findBreadCrumb(title, html) {
	_.forEach(data, function(object) {
		if (object.title === title) {
			if (object.parents[0] !== undefined) {
				
				totalHtml = html;
				
				return findBreadCrumb(object.parents[0], totalHtml);
			} else 
			if (object.parents[0] === undefined) {
			
				totalHtml = html.replace('> ', '');
				
				var li = $('<li></li>');
				li.html(totalHtml);
				li.appendTo('.previous-categories__list');
				return;
			}

		}
		if (object.alias === title) {
			if (object.parents[0] !== undefined) {
				
				totalHtml = ' > ' + object.title + html;
				
				return findBreadCrumb(object.parents[0], totalHtml);
			} else 
			if (object.parents[0] === undefined) {
			
				totalHtml = object.title + html;
				
				var li = $('<li></li>');
				li.html(totalHtml);
				li.appendTo('.previous-categories__list');
				
				return;
			}

		}
	})		
}