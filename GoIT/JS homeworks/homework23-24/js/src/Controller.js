define(
	'Controller',
	[
		'View',
		'Model', 
		'jquery',
		'tmpl'
	],
	function() {
		return	function Controller(model, view) {
			var self = this;

			view.elements.button.on('click', addItem);
			view.elements.container.on('click', '.todo__item-delete', removeItem);
			view.elements.list.on('click', '.todo__item-input', editItem);

			function addItem() {
				var newItem = view.elements.input.val();
				model.addItem(newItem);
				view.renderList(model.data);
				view.elements.input.val('');
			}
			
			function removeItem() {
				var item = $(this).attr('data-value');
				model.removeItem(item);
				view.renderList(model.data);
			}

			function editItem() {
				$(this).toggleClass('todo__item-input_border');
				var index = $(this).parent().index();
				var text = $(this).val();
				if (model.data[index] !== text) {
					model.addItem(text, index);
					view.renderList(model.data);
				}
				console.log(model.data);

			}

		return self;
		}
	}
);