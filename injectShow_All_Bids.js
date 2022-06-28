function Show_All_Bids(){
    let content = {};
    (function () {
      var atdpbjs =
        window.atdpbjs && window.atdpbjs.getAllWinningBids
          ? window.atdpbjs
          : window.pbjs;
      function forEach(responses, cb) {
        Object.keys(responses).forEach(function (adUnitCode) {
          var response = responses[adUnitCode];
          response.bids.forEach(function (bid) {
            cb(adUnitCode, bid);
          });
        });
      }
      var winners = atdpbjs.getAllWinningBids();
      var output = [];
      forEach(atdpbjs.getBidResponses(), function (code, bid) {
        output.push({
          bid: bid,
          adunit: code,
          adId: bid.adId,
          bidder: bid.bidder,
          time: bid.timeToRespond,
          cpm: bid.cpm,
          msg: bid.statusMessage,
          rendered: !!winners.find(function (winner) {
            return winner.adId == bid.adId;
          }),
        });
      });
      forEach(
        (atdpbjs.getNoBids && atdpbjs.getNoBids()) || {},
        function (code, bid) {
          output.push({
            msg: "no bid",
            adunit: code,
            adId: bid.bidId,
            bidder: bid.bidder,
          });
        }
      );
      if (output.length) {
        content.table= output;
        if (console.table) {
          console.table(output);
        } else {
          for (var j = 0; j < output.length; j++) {
            console.log(output[j]);
          }
        }
      } else {
        content.warn = "NO prebid responses";
        console.warn(content.warn);
      }
    })();
    window.postMessage({ type: "Show_All_Bids",content:JSON.parse(JSON.stringify(content))});

  }
  Show_All_Bids();