$('body > *').css({'display': 'none'});
$photos = $(".photo > a");
var thumbnails = new Array();
var large = new Array();
$photos.find("img").each(function() {
	thumbnails.push($(this).attr("src"));
});
/* Here you can only select 5.jpg - so no need in $.get() */
$photos.each(function() {
	$.get($(this).attr("href"))
	.then(function (data) {
		large.push($(data).find("#mainphoto").attr("src"));
	});
});