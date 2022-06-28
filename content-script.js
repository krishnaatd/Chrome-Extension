(function(){
    console.log('<----- Content script started running ----->');
    
    function injectScript(file_path, tag) {
        var node = document.getElementsByTagName(tag)[0];
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', file_path);
        node.appendChild(script);
    }
    
    chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) =>{
            injectScript(chrome.extension.getURL('inject'+request.message+'.js'), 'body');
          return true;
      });
    window.addEventListener("message", function (event) {
        // only accept messages from the current tab
        if (event.source != window)
        return;
        
        if (event.data.type && (event.data.type == "FROM_INJECT") && typeof chrome.app.isInstalled !== 'undefined') {
            chrome.runtime.sendMessage({ content: event.data.content });
        }
    }, false);
})();
