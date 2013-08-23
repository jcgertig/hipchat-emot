chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if (request.command == "submit-chat") { 
    chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.executeScript(tab.id, {code: "document.getElementById('send_message_button').click();"});
  	});
  }
});