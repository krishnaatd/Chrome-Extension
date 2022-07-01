window.data = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    window.data[sender.tab.id] = message.content || null;
    sendResponse(message.content);
});