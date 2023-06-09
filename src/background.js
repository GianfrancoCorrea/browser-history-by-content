chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === 'test') {
        // respond to the message with the history
        chrome.history.search({ text: '', maxResults: 10 }, (historyItems) => {
            sendResponse({ response: historyItems });
        });
        return true; // keep the messaging channel open for sendResponse
    }
});

function getCurrentPageContent(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            console.log('tabs length > 0')
            const tab = tabs[0];
            console.log('%c 🍇 tab: ', 'font-size:12px;background-color: #4b4b4b;color:#fff;', tab);
            chrome.tabs.sendMessage(tab.id, { action: 'getContent' }, (response) => {
                console.log('%c 🥜 response: ', 'font-size:12px;background-color: #FFDD4D;color:#fff;', response);
                if (response && response.content) {
                    callback(response.content);
                } else {
                    callback(null);
                }
            });
        } else {
            callback(null);
        }
    });
}

/* getCurrentPageContent((content) => {
    console.log(content);
    fetch('http://127.0.0.1:5000/api/html', {
        method: 'POST',
        body: new URLSearchParams({
            'html': content,
            'url': 'https://www.google.com',
            'title': 'Página 2'
        })
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}); */
