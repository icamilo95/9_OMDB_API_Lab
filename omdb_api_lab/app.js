$(document).ready(function() { 



function getMovie (){
	$("form").on("submit",function(e){
		e.preventDefault();
	    var movieToFind = $(".movie").val();
		$("li").remove();
		findDetails(movieToFind);

	});
}

function findDetails(movieToFind){
	$.getJSON("http://www.omdbapi.com/?s=" + movieToFind, function(data){
		console.log(data);
		if (data.Response === "False") {
			console.log("Camilo");
			$("h4").text("Movie not found. Try again please.");

		} else {
			for (var i = 0; i < data.Search.length; i++) {
			var movies = data.Search[i].Title;			
			$("ul").append("<li>" + movies + "</li>");
			}			
		}
	});
	

	// THIS LINES WORK
	// $.ajax({
	// 	url:"http://www.omdbapi.com/?s=" + movieToFind,
	// 	success: function(data){
	// 		var result = JSON.parse(data);
	// 		console.log(result);
	// 		showData(result);
	// 	}
	// });
}

$(document).ready(getMovie);

 });