/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/content_script.js ***!
  \*******************************/
// Listen for messages sent from background.js.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'getContent') {
    // Get the content of the web page.
    var pageContent = document.documentElement.innerHTML;
    // Send the content back to background.js.
    sendResponse({
      content: pageContent
    });
  }
});
/******/ })()
;
//# sourceMappingURL=content_script.js.map