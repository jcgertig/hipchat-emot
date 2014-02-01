var allemots = null;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if (request.command == "submit-chat") { 
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.executeScript(tab.id, {code: "document.getElementById('send_message_button').click();"});
  	});
  } else if (request.command == "set-emots"){
    var list = {};
    var data = {};
    request.emots.forEach(function(entry) {
      var emot = JSON.parse(entry);
      data[emot["alt"]] = entry;
      list[emot["alt"]] = Object.keys(list).length;
    });
    chrome.storage.sync.set(data);
    chrome.storage.sync.set({'list': JSON.stringify(list)});
  } else if (request.command == "get-emots"){

    chrome.storage.sync.get("list", function(result) {
      if (!result || result == "{}") {
        getPage();
      } else {
        emots = JSON.parse(result);
        var data = [];
        Object.keys(emots).forEach(function(entry) {
          chrome.storage.sync.get(entry, function(result) {
            data.push(result);
          });
        });
        console.log("" + result);
        sendResponse({emots: result});
      }
    });
  } 
});

;function getPage(){
  var oldWin = this.window;
	//alert("You are goning to be redirected to a page to get all hipchat emoticons. Please refresh that page then come back and refresh this page.")
	var win=window.open('http://hipchat-emoticons.nyh.name', '_blank');
  win.focus();
  //oldWin.focus();

};