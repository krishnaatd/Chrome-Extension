(function() {

    // chrome.runtime.onMessage.addListener(
      //   function(request, sender, sendResponse) {
        //     console.log(sender.tab ?
        //                 "from a content script:" + sender.tab.url :
        //                 "from the extension");
        //     if (request.greeting === "hello")
        //       sendResponse({farewell: "goodbye"});
        //   }
        // );
        
        
        function inject(fn) {

          const scriptElement = document.createElement('script')
          scriptElement.text = `(${fn.toString()})();`
          document.documentElement.appendChild(scriptElement);
          console.log(document.getElementById('Show_All_Bids'))
        }
        chrome.runtime.onMessage.addListener(
          (request, sender, sendResponse) =>{
            inject(script);
            return true;
        });
        window.addEventListener("getChromeData", function(evt) {
          var request = evt.detail;
          var response = {requestId: request.id};
          // do Chrome things with request.data, add stuff to response.data
          window.dispatchEvent(new CustomEvent("sendChromeData", {detail: response}));
        }, false);
        // window.addEventListener('message',(event)=>{
        //   if(event.data.type && event.data.type=="METHOD_RESPONSE" && typeof chrome.app.isInstalled !=='undefined'){
        //     chrome.runtime.sendMessage({essential: event.data.essential})
        //   }
        // },false)
  })()
  