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

_.forEach(levelOne, function(levelOneObject){
	var levelTwo = [];
	var id = 1;
			// console.log(levelOneObject.name);
	_.forEach(data, function(dataObject){
			// console.log(dataObject.parents);
		if (levelOneObject.name == dataObject.parents) {
			var stage = {};
			stage.id = levelOneObject.id + '' + id++;
			stage.text = dataObject.title;
			levelTwo.push(stage);
			// console.log(levelTwo);
		};
	});
	levelOneObject.item = levelTwo;
	// console.log(levelOneObject);
	// console.log(level0.item.levelOneObject);
});


// console.log(level0.item);
// console.log(level0);