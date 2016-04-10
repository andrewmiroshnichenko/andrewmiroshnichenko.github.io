define(
	'Model',
	[],
	function() {
		return function Model(data) {
			var self = this;

			self.data = data;
			
			self.addItem = function(item, newIndex) {
				var index = self.data.indexOf(item);
				console.log(index);
				
				if (item.length === 0) {
					return;
				}

				if (index === -1) {
					self.data[newIndex] = item;
					return self.data;
				}

				self.data.push(item);
				return self.data;
			}

			self.removeItem = function(item) {
				var index = self.data.indexOf(item);

				if (index === -1) {
					return;
				}

				self.data.splice(index, 1);
				return self.data;
			}

			return self;
		}
	}
);