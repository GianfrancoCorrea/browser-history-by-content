chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === 'getHistory') {
        // respond to the message with the history
        chrome.history.search({ text: '', maxResults: 10 }, (historyItems) => {
            sendResponse({ response: historyItems });
        });
        return true; // keep the messaging channel open for sendResponse
    }
});
