/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.action === 'getHistory') {
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
/******/ })()
;
//# sourceMappingURL=background.js.map