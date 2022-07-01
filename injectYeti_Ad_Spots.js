
function Yeti_Ad_Spots(){
    let content = {
        warn:{},
        error:{},
    }
    for (layout in _fiBackupData) {
      if (_fiBackupData.hasOwnProperty(layout)) {
        _fiBackupData[layout].forEach((spot) => {
          console.warn(spot.code);
          let ads = [];
          try {
            ads = Sizzle(`div[id^="${spot.code.replace("#", "")}"`);
          } catch (e) {
            console.error(e);
            ads = Sizzle(spot.code);
          }
          if (ads.length == 0 && spot.is_live == true) {
            console.warn("====\n\n");
            content.error.noElements = `!! No elements matched for ad spot ${spot.name}`;
            content.error.selector =  `Selector: ${
                spot.dynamic
                  ? spot.ad_type_data.selector || spot.ad_type_data.mslct
                  : spot.code
              }`;
            content.error.ASlink =
            `Ad spot: http://yeti.automatad.com/diag-spot/${spot.id}/`
          ;
            console.error(content.error.noElements);
            console.error(content.error.selector);
            console.error(content.error.ASlink);
          } else {
            content.warn.rendered = 
            `Ad spot rendered: http://yeti.automatad.com/diag-spot/${spot.id}/`
          
            console.warn(content.warn.rendered);
          }
          ads.forEach((ad) => {
            ad.setAttribute("name", spot.name);
  
            if (!ad.getAttribute("overlayed")) {
              ad.setAttribute("overlayed", "true");
              ad.style.position = "relative";
              let anchor = document.createElement("a"),
                div = document.createElement("div");
              anchor.setAttribute(
                "href",
                `http://yeti.automatad.com/diag-spot/${spot.id}/`
              );
              div.setAttribute(
                "style",
                "width: 100%;height: 100%;position: absolute;top: 0px;left: 0px;background: rgb(73, 93, 160, 0.5);"
              );
              anchor.setAttribute("target", "_blank");
              anchor.appendChild(div);
              ad.appendChild(anchor);
            }
          });
        });
      }
    }
    window.postMessage({ type: "INJECT_Yeti_Ad_Spots",content:JSON.parse(JSON.stringify(content))});

  };
  Yeti_Ad_Spots();