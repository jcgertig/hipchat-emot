;function getFromStorage(func){
	function callback(result){
		func( result );
	}
	chrome.storage.sync.get(["emot_per_page"], callback);
};

;function dealWithCount( result ){

};

;window.onload = function(){
	var input = document.getElementsByClassName("input")[0].innerHTML = "";
	$(".input").load(chrome.extension.getURL("input.html"), function(){
		$(".emoticon").click(function(event){
			var text = $("#message_input").val();
			var attr = event.target.getAttribute("data-shortcut");
			if (event.target.getAttribute("data-shortcut")) {
				text = text + " " + event.target.getAttribute("data-shortcut");
			} else if (event.target.getAttribute("alt")) {
				text = text + " " + event.target.getAttribute("alt");
			} else {
				text = text + " " + event.target.val();
			}
			$("#message_input").val(text);
		});

		$("#emotbottom").attr("src", chrome.extension.getURL("bottom.png"));
	});
};


;var emots =[
'<a class="emoticon" data-shortcut="(allthethings)" href="#(allthethings)"><img alt="(allthethings)" src="https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/allthethings.png" style="width:36px; height:30px" title="(allthethings)"><div class="shortcut">(allthethings)</div></a>','<a class="emoticon" data-shortcut="(android)" href="#(android)"><img alt="(android)" src="https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/android.png" style="width:25px; height:25px" title="(android)"><div class="shortcut">(android)</div></a>',
];