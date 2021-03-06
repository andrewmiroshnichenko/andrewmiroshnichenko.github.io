var level0 = {}; 			 // Root of tree JSON object
var flatObjects = [];		 // Objects for categories with assigned id's
var results = []; 			 // Results of user's choice. They are formed when "I make my decision" button fires
var checkedBoxes = [];		 //
var login;					 // User's login

// Preparing JSON for tree generation
(function buildGeneralTree(){

		level0.id = 0;

		var levelOne = [];
		var id = 0;
		_.forEach(data, function(object){
			if (object.parents.length === 0) {
				var stage = {};
				stage.id = ++id;
				stage.text = object.title;
				stage.name = object.alias;
				levelOne.push(stage);
				flatObjects.push(stage);
			};
		});

		console.log(levelOne);

		level0.item = levelOne;

		function buildChildTree(parentLevelArray) {
			_.forEach(parentLevelArray, function(parentLevelObject){
				var nextLevel = [];
				var id = 0;
				_.forEach(data, function(dataObject){
					if (parentLevelObject.name == dataObject.parents) {
						var stage = {};
						stage.id = parentLevelObject.id + '' + ++id;
						stage.text = dataObject.title;
						stage.name = dataObject.alias;
						nextLevel.push(stage);
						flatObjects.push(stage);
					};
				});

				if (nextLevel.length) {
					parentLevelObject.item = nextLevel;
				}
			});
		};

		buildChildTree(level0.item);

		for (var i = 0; i < level0.item.length; i++) {
			buildChildTree(level0.item[i].item);
			for (var j = 0; j < level0.item[i].item.length; j++) {
				if (level0.item[i].item[j].item != undefined){
					buildChildTree(level0.item[i].item[j].item);
				}
			}
		}

})();

// Save results button handler
$('.save-results').on('click', function(e) {
		
		// This just ensures that every time button clicked user gets appropriates results array

		results = [];
		e.preventDefault();

		// Collect information about checked boxes

		var imageState = $('.dhx_bg_img_fix').css('background-image');
		imageState = imageState.split('/');
		imageState = _.initial(imageState);
		imageState = _.join(imageState, '/');

		$('.dhx_bg_img_fix').each(function() {
			if ( $(this).css('background-image') === imageState + '/iconCheckAll.gif")'){
				$(this).parent().siblings().each(function(){
					if ($(this).children().html() !== '&nbsp;') {
						var category = $(this).children().html();
						category = category.replace(/&amp;/g, '&');
						findChecked(category);
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
function CheckedBoxes(JSON) {

		var categories = JSON;
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
function findChecked (category) {
		_.forEach(data, function(dataObject) {
			if (dataObject.title == category) {
				results.push(dataObject.alias);
			}
		})

}

function previouslySeletedBreadCrumbs(JSON) {

		// Creating breadcrumbs

		var title = '';
		var totalHtml = '';
		var imageState = $('.dhx_bg_img_fix').css('background-image');
		imageState = imageState.split('/');
		imageState = _.initial(imageState);
		imageState = _.join(imageState, '/');

		// Searching root

		$('.dhx_bg_img_fix').each(function() {
			if ( $(this).css('background-image') === imageState + '/iconCheckAll.gif")'){
				$(this).parent().siblings().each(function(){
					if ($(this).children().html() !== '&nbsp;') {
						title = $(this).children().html();
						title = title.replace(/&amp;/g, '&');
						totalHtml = ' > ' + '<strong>' + title + '</strong>';
						_.forEach(data, function(object) {
							if (object.title === title) {
								alias = object.parents[0];
								findBreadCrumb(alias, totalHtml);
							}
						})
						totalHtml = '';
					}
				})
			} 
		});

}

// Searching parents of the root
function findBreadCrumb(alias, html) {
		_.forEach(data, function(object) {
			if ( (object.alias === alias) && (object.parents[0] !== undefined) ) {
				
				totalHtml = ' > ' + object.title + html;
				alias = object.parents[0];
				
				return findBreadCrumb(alias, totalHtml);
			} else 
			if ( (object.alias === alias) && (object.parents[0] === undefined) ) {
				totalHtml = object.title + html;
				
				var li = $('<li></li>');
				li.html(totalHtml);
				li.appendTo('.previous-categories__list');
				// console.log(totalHtml);
				
				return;
			}
		})		

}