let buttonElements = [
    "Get_GPT",
    "Yeti_Ad_Spots",
    "Show_All_Bids",
];



function popup(eleId) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message":eleId},(response)=>{
            alert("received globa response",response)
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    buttonElements.forEach(eleId=>{
        document.getElementById(eleId).addEventListener('click',()=>popup(eleId));
    });
    let bg = chrome.extension.getBackgroundPage();

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        let currentTabId = tabs[0].id;
        let currentData = bg.data[currentTabId];

        // safety check: when page is still loading
        if (!currentData) {
            return;
        }
        alert(JSON.stringify(currentData));
        // // map essential perf metrics
        // let { timing, timeOrigin } = currentPerf.performance;
        // let corePerfMetrics = {};
        // corePerfMetrics['DOM Completed'] = timing.domComplete - timeOrigin;
        // corePerfMetrics['Connect Time'] = timing.connectEnd - timing.connectStart;
        // corePerfMetrics['DOM Content Event'] = timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart;
        // corePerfMetrics['Response Time'] = timing.responseEnd - timing.requestStart; 
        // corePerfMetrics['Unload Event'] = timing.unloadEventEnd - timing.unloadEventStart;
        // corePerfMetrics['DOM Interactive'] = timing.domInteractive - timeOrigin;
        // corePerfMetrics['Redirect Time'] = timing.redirectEnd - timing.redirectStart;

        // Object.keys(corePerfMetrics).map((key) => {
        //     let tile = document.createElement('div');
        //     tile.className = 'metric-tile';
        //     let tileCaption = document.createElement('p');
        //     tileCaption.className = 'metric-caption';
        //     tileCaption.innerHTML = key;
        //     let tileMetric = document.createElement('p');
        //     tileMetric.className = 'metric-value';
        //     tileMetric.innerHTML = `${corePerfMetrics[key].toFixed(2)}<span class='metric-ms'>ms</span>`;

        //     tile.append(tileCaption);
        //     tile.append(tileMetric);

        //     let tileSection = document.getElementById('tile-section');
        //     tileSection.append(tile);
        // });
    });
});
