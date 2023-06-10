/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.action === 'test') {
    // respond to the message with the history
    chrome.history.search({
      text: '',
      maxResults: 10
    }, function (historyItems) {
      sendResponse({
        response: historyItems
      });
    });
    return true; // keep the messaging channel open for sendResponse
  }
});

function getCurrentPageContent(callback) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (tabs.length > 0) {
      chrome.history.search({
        text: '',
        maxResults: 10
      }, function (historyItems) {
        if (historyItems) {
          callback(historyItems);
        } else {
          callback(null);
        }
      });
      return true;
    } else {
      callback(null);
    }
    return true;
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
            'urls': content
           
        })
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
 */
/******/ })()
;
//# sourceMappingURL=background.js.map