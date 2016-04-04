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

			function addItem() {
				var newItem = view.elements.input.val();
				model.addItem(newItem);
				view.renderList(model.data);
				view.elements.input.val('');
			}
			
			function removeItem(){
				var item = $(this).attr('data-value');
				model.removeItem(item);
				view.renderList(model.data);
			}
			
		return self;
		}
	}
);