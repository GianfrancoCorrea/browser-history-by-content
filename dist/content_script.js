/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/content_script.js ***!
  \*******************************/
// content.js

// Escucha los mensajes enviados desde background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'getContent') {
    // Obtén el contenido de la página web
    var pageContent = document.documentElement.innerHTML;
    // Envía el contenido de vuelta a background.js
    sendResponse({
      content: pageContent
    });
  }
});

/* chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (response) {
        console.log(response.farewell);
    });
}); */
/******/ })()
;
//# sourceMappingURL=content_script.js.map