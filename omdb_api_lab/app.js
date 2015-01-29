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
		if (data.Response === "False") {
			$(".noMovie").text("Movie not found. Try again please.");
		} else {
			for (var i = 0; i < data.Search.length; i++) {
			var movies = data.Search[i].Title;			
			$("ul").append("<li class='movieList'>" + movies + "</li>");
			}			
		} showPoster ();
	});
	
	// THESE LINES WORK
	// $.ajax({
	// 	url:"http://www.omdbapi.com/?s=" + movieToFind,
	// 	success: function(data){
	// 		var result = JSON.parse(data);
	// 		console.log(result);
	// 		showData(result);
	// 	}
	// });
}

function showPoster () {
	
	$("ul").on("click",".movieList",function(e){
		$('img').empty();
		var selectedMovie = $(this).text();
		console.log(selectedMovie);
		$.ajax({
			url: "http://www.omdbapi.com/?t=" + selectedMovie,
			type: 'GET',         //Why poster does not work without "these properties", but movie tittle does?
  			dataType: 'json',
			data:{},
			success: function(data) {
				if (data.Poster.length > 5) {
					var info = $("img").attr("src", data.Poster); 
					$("ul").append(info);		
				}else {
					$(".noPoster").text("Poster not availabe. Try again please.");
				}
			}
 		});
	});
}

$(document).ready(getMovie);

 });