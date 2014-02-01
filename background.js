function getPage(){
  alert("You are going to be redirected to a page to get all hipchat emoticons. Please refresh that page then come back and refresh this page.");
  var win = window.open('http://hipchat-emoticons.nyh.name', '_blank');
  win.focus();
}

var mData = [];
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if (request.command == "submit-chat") { 
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.executeScript(tab.id, {code: "chat.send_message();"});
    });
  } else if (request.command == "set-emots"){
    var data = {};
    request.emots.forEach(function(entry) {
      var emot = JSON.parse(entry);
      data[emot.alt] = JSON.stringify(entry);
    });
    chrome.storage.sync.clear();
    chrome.storage.sync.set(data);
  } else if (request.command == "get-emots"){
    //Not sure why the alert is needed it is like it lets the sendResponce out of the function
    alert(chrome.storage.sync.get(null, function(result){
      if (!result || result == "{}") {
        getPage();
      } else {
        Object.keys(result).forEach(function(entry) {
          mData.push(result[entry]);
        });
      }
      sendResponse({emots: mData.join("}|+|{")});
    }));
  } 
});