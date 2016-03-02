var level0 = {};
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
	};
});

level0.item = levelOne;


	_.forEach(levelOne, function(parentLevelObject){
		var nextLevel = [];
		var id = 1;
		_.forEach(data, function(dataObject){
			if (parentLevelObject.name == dataObject.parents) {
				var stage = {};
				stage.id = parentLevelObject.id + '' + id++;
				stage.text = dataObject.title;
				stage.name = dataObject.alias;
				nextLevel.push(stage);
				// console.log(nextLevel);
			};
		});
		parentLevelObject.item = nextLevel;
	});


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
				// console.log(nextLevel);
			};
		});

		if (nextLevel.length) {
			parentLevelObject.item = nextLevel;
		}
		// console.log(parentLevelObject.item);

	});
};

for (var i = 0; i < level0.item.length; i++) {
	// console.log(i);
	buildTree(level0.item[i].item);
	for (var j = 0; j < level0.item[i].item.length; j++) {
		if (level0.item[i].item[j].item != undefined){
			buildTree(level0.item[i].item[j].item);
			console.log(level0.item[i].item[j].name);
		}
	}
}
	// console.log(level0.item[0].item);
	// console.log(level0.item[0].item[23].item);
	// console.log(level0.item[0].item[23].name);

