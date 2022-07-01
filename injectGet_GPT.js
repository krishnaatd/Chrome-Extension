function Get_GPT(){
    let content = {};
    window.googletag
      .pubads()
      .getSlots()
      .forEach((a, i) => {
        content.index = i+1;
        content.adUnit =  a.getAdUnitPath();
        content.adUnit =  a.getAdUnitPath()
        content.slotElemId = a.getSlotElementId();
        content.sizes = a.getSizes()
        content.slotElem = document.getElementById(a.getSlotElementId())
        content.responseInformation = a.getResponseInformation()
  
        console.warn(i + 1);
        console.warn("DFP Ad unit: " + a.getAdUnitPath());
        console.warn("Div ID: " + a.getSlotElementId());
        console.warn("sizes");
        console.warn(a.getSizes());
        console.warn(document.getElementById(a.getSlotElementId()));
        console.warn(a.getResponseInformation());
        console.warn("-----");
      });
        window.postMessage({ type: "INJECT_GET_GPT", content:JSON.parse(JSON.stringify(content))});
  };
Get_GPT();