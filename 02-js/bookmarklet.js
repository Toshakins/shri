// javascript:
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
            $("body").append("<div id='mydesk'></div>");
            $mydesk = $("#mydesk");
            $mydesk.css({
                'overflow'  : 'hidden',
                'background': 'black',
                'width'     : '100%',
                'height'    : '100%',
                'position'  : 'fixed',
                'top'       : '0',
                'left'      : '0',
                'z-index'   : '20000',
                'opacity'   : '0.8'
            });
            $("body").append("<div id='myalbum'></div>");
            $myalbum = $("#myalbum");
            $myalbum.css({
                "overflow-x": "hidden",
                "overflow-y": "auto",
                'width'     : '100%',
                'height'    : '100%',
                'position'  : 'fixed',
                'top'       : '0',
                'left'      : '0',
                'z-index'   : '20000'
            });
            for (var i = 0; i < photos.length; ++i){
                $myalbum.append("<img src=" + photos[i] + "3.jpg" + 
                    " alt='alt' />");
            }
        });
    }
})();