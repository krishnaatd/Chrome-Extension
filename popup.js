let buttonElements = [
    "Get_GPT",
    "Yeti_Ad_Spots",
    "Show_All_Bids",
];



function popup(eleId) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message":eleId});
    });
}

document.addEventListener("DOMContentLoaded", function() {
    buttonElements.forEach(eleId=>{
        document.getElementById(eleId).addEventListener('click',()=>popup(eleId));
    });
});
