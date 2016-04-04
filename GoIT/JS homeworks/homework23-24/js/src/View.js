define(
	'View',
	[
		'Model', 
		'jquery',
		'tmpl'
	],
	function() {
		return function View(model) {
			// console.log(model.data);
			var self = this;

			self.init = function() {
				var temp = tmpl( $('#main-page').html() );
				$('body').append(temp);

				self.elements = {
					input: $('.todo__input'),
					button: $('.todo__button'),
					container: $('.todo__list')
				}

				self.renderList(model.data);
			}

			self.renderList = function(data) {
				if (data === undefined) {
					return;
				}
				var list = tmpl( $('#todo-item').html(), {data: data});
				self.elements.container.html(list);
			}

			self.init();

			return self;
		}
	}
);