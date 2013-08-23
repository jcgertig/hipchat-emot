;function getFromStorage(func){
	function callback(result){
		func( result );
	}
	chrome.storage.sync.get(["emot_per_page"], callback);
};

;function dealWithCount( result ){

};

;window.onload = function(){
	jQuery.noConflict()
	var input = document.getElementsByClassName("input")[0].innerHTML = "";
	jQuery(".input").load(chrome.extension.getURL("input.html"), function(){
		jQuery(".emoticon").click(function(event){
			var text = jQuery("#message_input").val();
			var emot = event.target.getAttribute("data-shortcut");
			if (event.target.getAttribute("data-shortcut")) {
				emot = event.target.getAttribute("data-shortcut");
			} else if (event.target.getAttribute("alt")) {
				emot = event.target.getAttribute("alt");
			} else {
				emot = event.target.val();
			}
			var caret = getCaret(document.getElementById("message_input"));
      text = text.substring(0,caret)+ " " + emot + " " + text.substring(caret,text.length);
			jQuery("#message_input").val(text);
		});

		jQuery("#emotbottom").attr("src", chrome.extension.getURL("bottom.png"));

		jQuery('#message_input').keypress(function(e){
  		if (e.which == 13) {
  			e.preventDefault();
  			chrome.runtime.sendMessage({ command: "submit-chat" });
  		}
		});
	});
};

;function getCaret(el) {
  if (el.selectionStart) {
     return el.selectionStart;
  } else if (document.selection) {
     el.focus();

   var r = document.selection.createRange();
   if (r == null) {
    return 0;
   }

    var re = el.createTextRange(),
    rc = re.duplicate();
    re.moveToBookmark(r.getBookmark());
    rc.setEndPoint('EndToStart', re);

    return rc.text.length;
  }  
  return 0;
};

;var emots =[
'<a class="emoticon" data-shortcut="(allthethings)" href="#(allthethings)"><img alt="(allthethings)" src="https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/allthethings.png" style="width:36px; height:30px" title="(allthethings)"><div class="shortcut">(allthethings)</div></a>','<a class="emoticon" data-shortcut="(android)" href="#(android)"><img alt="(android)" src="https://dujrsrsgsd3nh.cloudfront.net/img/emoticons/android.png" style="width:25px; height:25px" title="(android)"><div class="shortcut">(android)</div></a>',
];