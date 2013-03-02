javascript:
(function () {
	var v = "1.8.0";
	if (window.jQuery === undefined/* || window.jQuery.fn.jquery < v*/) {

		var done = false;
		script = document.createElement("script");
		script.src="http://code.jquery.com/jquery-1.9.1.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded"
				|| this.readyState == "complete")) {
				done = true;
				init();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	init();

	function init() {
		
		nextPage = (function () {
			var page = 1;
			return (function() {return page++;});
		})();

		base = "http://500px.com/photos?page=";
		var photos = new Array();
		$.get(base + nextPage())
		.then(function (data) {
		$(data).find(".photo img").each(function() {
			/* todo: replace w/ regexp */
			photos.push($(this).attr("src").replace("3.jpg", ""));
		});
		$("body").append("<div id='desk'></div>");
		$desk = $("#desk");
		$desk.css({
			'overflow'  : 'hidden',
			'background': 'gray'
		});
		console.log($desk);
		});
	}
})();