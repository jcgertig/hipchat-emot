var emoticons = null;

window.onload = function(){
	jQuery.noConflict();
	if (jQuery(".emoticons")[0] != undefined){
		var index = 0;
		var formated_data = [];
		jQuery(".emoticons").each(function(){
			if (index == 0){
				jQuery(this).children(".emoticon").each(function(){
					var emot = {};
					jQuery(this).children("img").each(function(){
						emot.alt = jQuery(this).attr("alt");
						emot.src = jQuery(this).attr("src");
						emot.style = jQuery(this).attr("style")
						formated_data.push(emot);
					});
				});
				index += 1;
			}
		});
		
		chrome.runtime.sendMessage({ command: "set-emots", 'emots': formated_data });
		jQuery(".emoticons")[0].innerHTML = "<h1><center>Got it!</center></h1>";
	} else {
		chrome.runtime.sendMessage({command: "get-emots"}, function(response) {
    		emoticons = response.emots;
  			if (emoticons !== null) { 
				jQuery(".input").children().children().children().children("tr").each(function(index, item){
					var newcell = item.insertCell(2);
					newcell.width = "1%";
					newcell.setAttribute("id", "hipchat-emot");
					jQuery("#hipchat-emot").load(chrome.extension.getURL("input.html"), function(){
						jQuery("#allemots").css("height", window.innerHeight/2);

						emoticons.split("|≈|").forEach(function(entry) {
							var emot = JSON.parse(entry);
				        	document.getElementById("allemots").innerHTML += 
				        	("<a class='emoticon' data-shortcut=\"" + emot.alt + "\" href='#'>" +
	        					"<img alt=\"" + emot.alt + "\" src=\"" + emot.src + "\" style=\"" + emot.style + "\" title=\"" + emot.alt + "\">" +
	      					"</a>");
				        });
						
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
					  			chrome.runtime.sendMessage({ command: "$('#send_message_button').click();" });
					  		}
						});
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