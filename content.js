;var emoticons = null;

;window.onload = function(){
	jQuery.noConflict();
	if (jQuery(".emoticons")[0] != undefined){
		var emots = jQuery(".emoticons")[0].innerHTML;
		emots = emots.replace(/<div class="shortcut">.*?<\/div>/gi, "");
    emots = emots.replace(/\t/gi, '');
    emots = emots.replace(/\r/gi, '');
    emots = emots.replace(/\n/gi, '');
    emots = emots.replace(/\s\s/gi, '');
    chrome.runtime.sendMessage({ command: "set-emots", 'emots': emots });
    jQuery(".emoticons")[0].innerHTML = "<h1><center>Got it!</center></h1>";

	} else {
		chrome.runtime.sendMessage({command: "get-emots"}, function(response) {
    	emoticons = response.emots;
  		if (emoticons !== null) { 
				var input = document.getElementsByClassName("input")[0].innerHTML = "";
				jQuery(".input").load(chrome.extension.getURL("input.html"), function(){
					jQuery("#allemots").css("height", window.innerHeight/2);

					document.getElementById("allemots").innerHTML = emoticons;
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
						moveCaret(document.getElementById("message_input"), emot.length+1);
					});

					jQuery("#emotbottom").attr("src", chrome.extension.getURL("bottom.png"));

					jQuery('#message_input').keypress(function(e){
			  		if (event.keyCode == 13 && event.shiftKey) {
			  			e.preventDefault();
							var text = jQuery("#message_input").val();
			      	var caret = getCaret(document.getElementById("message_input"));
			      	text = text.substring(0,caret) + "\n" + text.substring(caret,text.length);
			      	jQuery("#message_input").val(text);

						} else if (e.which == 13) {
			  			e.preventDefault();
			  			chrome.runtime.sendMessage({ command: "submit-chat" });
			  		}
					});
				});
			}
		});
	}
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

function moveCaret(el, dist) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.selectionStart + dist;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}