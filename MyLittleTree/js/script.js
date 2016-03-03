var level0 = {};
var flatObjects = [];
var results = [];

(function(){
// Preparing JSON for tree generation

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
			// console.log(stage.id);

		};
	});

	level0.item = levelOne;

	function buildTree(parentLevelArray) {
		_.forEach(parentLevelArray, function(parentLevelObject){
			var nextLevel = [];
			var id = 1;
			_.forEach(data, function(dataObject){
				if (parentLevelObject.name == dataObject.parents) {
					var stage = {};
					stage.id = parentLevelObject.id + '' + id++;
					stage.text = dataObject.title;
					stage.name = dataObject.alias;
					nextLevel.push(stage);
					flatObjects.push(stage);
 		   			// console.log(stage.id);

				};
			});

			if (nextLevel.length) {
				parentLevelObject.item = nextLevel;
			}

		});
	};

	buildTree(level0.item);

	for (var i = 0; i < level0.item.length; i++) {
		buildTree(level0.item[i].item);
		for (var j = 0; j < level0.item[i].item.length; j++) {
			if (level0.item[i].item[j].item != undefined){
				buildTree(level0.item[i].item[j].item);
			}
		}
	}
})();

function formResults(id, state) {
		if (id.length === undefined) {
			var checkedObject = _.find(flatObjects, { 'id': id });
		} else {
			var checkedObjectId = id.split('_');
			var checkedObject = _.findLast(flatObjects, { 'id': checkedObjectId[0] });
		}
	
		if(state) {
			results.push(checkedObject.text);
		} else {
			console.log(checkedObject.text);
			_.pull(results, checkedObject.text);
		}
};

(function saveSelection() {
	var button = document.querySelector('.button');

	button.onclick = function(e) {
	e.preventDefault();
	document.querySelector('.popup').innerHTML = '';
	document.querySelector('.popup').innerHTML = results;
	console.log(results);
      document.querySelector('.popup').style.display = 'block';
    };
})();