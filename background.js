function getPage(){
  var win = window.open('http://hipchat-emoticons.nyh.name', '_blank');
  alert("You are going to be redirected to a page to get all hipchat emoticons. Please refresh that page then come back and refresh this page.");
  win.focus();
};

var getEmots = function(callback){
    chrome.storage.sync.get(null, function(result){
      if (!result) {
        alert("Oh no!");
        getPage();
      } else {
        Object.keys(result).forEach(function(entry) {
          alert(entry + " -> " + result[entry]);
          mData.push(result[entry]);
        });
      }
      typeof callback === 'function' && callback(mData);
    });
};

var mData = [];
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if (request.command == "submit-chat") { 
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.executeScript(tab.id, {code: "chat.send_message();"});
    });
  } else if (request.command == "set-emots"){
    var data = {};
    request.emots.forEach(function(entry) {
      data[entry.alt] = JSON.stringify(entry);
    });
    chrome.storage.sync.clear();
    chrome.storage.sync.set(data);
  } else if (request.command == "get-emots"){
    getEmots(function(mData){ sendResponse({emots: mData.join("|≈|")}); });
    return true;
  } 
});