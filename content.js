(function() {
    let methods = {};
    function script() {
        methods = {
          Get_GPT:()=>{
              window.googletag.pubads().getSlots().forEach((a, i) => {
                  console.warn(i+1);
                  console.warn('DFP Ad unit: '+ a.getAdUnitPath());
                  console.warn('Div ID: '+ a.getSlotElementId());
                  console.warn('sizes');
                  console.warn(a.getSizes());
                  console.warn(document.getElementById(a.getSlotElementId()));
                  console.warn(a.getResponseInformation());
                  console.warn('-----')
              });
          },
          Yeti_Ad_Spots:()=>{
            for (layout in _fiBackupData) {
                if (_fiBackupData.hasOwnProperty(layout)) {
                    _fiBackupData[layout].forEach((spot) => {
                        console.warn(spot.code);
                        let ads = [];
                        try {
                            ads = Sizzle(`div[id^="${spot.code.replace('#','')}"`);
                        } catch (e) {
                            console.error(e)
                            ads = Sizzle(spot.code);
                        }
                        if (ads.length == 0 && spot.is_live == true) {
                            console.warn('====\n\n');
                            console.error(`!! No elements matched for ad spot ${spot.name}`);
                            console.error(`Selector: ${spot.dynamic ? (spot.ad_type_data.selector || spot.ad_type_data.mslct) : spot.code}`)
                            console.error(`Ad spot: http://yeti.automatad.com/diag-spot/${spot.id}/`);
                        }else{
                            console.warn(`Ad spot rendered: http://yeti.automatad.com/diag-spot/${spot.id}/`);
                        }
                        ads.forEach((ad) => {
                            ad.setAttribute('name', spot.name);
            
                            if(!ad.getAttribute('overlayed')){
                                ad.setAttribute('overlayed', 'true');
                                ad.style.position = 'relative';
                                let anchor = document.createElement('a'),
                                    div = document.createElement('div');
                                anchor.setAttribute('href', `http://yeti.automatad.com/diag-spot/${spot.id}/`);
                                div.setAttribute('style', 'width: 100%;height: 100%;position: absolute;top: 0px;left: 0px;background: rgb(73, 93, 160, 0.5);');
                                anchor.setAttribute('target', '_blank');
                                anchor.appendChild(div);
                                ad.appendChild(anchor);
                            }
                        })
                    })
                }
              }
          },
          Show_All_Bids:()=>{
            (function() {
              var atdpbjs = (window.atdpbjs && window.atdpbjs.getAllWinningBids) ? window.atdpbjs : window.pbjs;
              function forEach(responses, cb) {
                Object.keys(responses).forEach(function(adUnitCode) {
                  var response = responses[adUnitCode];
                  response.bids.forEach(function(bid) {
                    cb(adUnitCode, bid);
                  });
                });
              }
              var winners = atdpbjs.getAllWinningBids();
              var output = [];
              forEach(atdpbjs.getBidResponses(), function(code, bid) {
                output.push({
                  bid: bid,
                  adunit: code,
                  adId: bid.adId,
                  bidder: bid.bidder,
                  time: bid.timeToRespond,
                  cpm: bid.cpm,
                  msg: bid.statusMessage,
                  rendered: !!winners.find(function(winner) {
                    return winner.adId==bid.adId;
                  })
                });
              });
              forEach(atdpbjs.getNoBids && atdpbjs.getNoBids() || {}, function(code, bid) {
                output.push({
                  msg: "no bid",
                  adunit: code,
                  adId: bid.bidId,
                  bidder: bid.bidder
                });
              });
              if (output.length) {
                if (console.table) {
                  console.table(output);
                } else {
                  for (var j = 0; j < output.length; j++) {
                    console.log(output[j]);
                  }
                }
              } else {
                console.warn('NO prebid responses');
              }
            })();
          }

        }


      // your main code here
      window.foo = 'bar';
      let itr  = window.setInterval(() => {
        if(window.googletag && window.googletag.pubads){
            window.clearInterval(itr);
            methods.Get_GPT();
        }
      }, 300)
      let itr2  = window.setInterval(() => {
        if(window._fiBackupData){
            window.clearInterval(itr2);
            methods.Yeti_Ad_Spots();
        }
      }, 300);
      let itr3  = window.setInterval(() => {
        if(window.atdpbjs){
            window.clearInterval(itr3);
            methods.Show_All_Bids();
        }
      }, 300)
      
    }
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
  })()
  