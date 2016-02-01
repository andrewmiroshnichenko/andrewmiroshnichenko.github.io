$(document).ready(function() {
	
	$("#owl-demo").owlCarousel({
		jsonPath : 'js/images.json',
		jsonSuccess : customDataSuccess,
		pagination: false
	});

	function customDataSuccess(data){
		var content = "";
		for(var i in data["items"]){	

			var img = data["items"][i].img;
			var alt = data["items"][i].alt;	 

			content += "<a href='#'><img src=\"" +img+ "\" alt=\"" +alt+ "\"></a>"
		}

		$("#owl-demo").html(content);
	}
});