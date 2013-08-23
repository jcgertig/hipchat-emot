var allemots = null;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if (request.command == "submit-chat") { 
    chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.executeScript(tab.id, {code: "document.getElementById('send_message_button').click();"});
  	});
  } else if (request.command == "set-emots"){
  	allemots = request.emots;
  } else if (request.command == "get-emots"){
  	if (!allemots) {
  		getPage();
  	} else {
  		sendResponse({emots: allemots});
  	}
  } 
});

;function getPage(){
	alert("You are goning to be redirected to a page to get all hipchat emoticons. Please refresh that page then come back and refresh this page.")
	var win=window.open('http://hipchat-emoticons.nyh.name', '_blank');
  win.focus();
};