/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/* 
// Escucha el evento de instalación de la extensión
chrome.runtime.onInstalled.addListener(() => {
    // Obtiene el historial de navegación
    chrome.history.search({ text: '', maxResults: 10 }, (historyItems) => {
        // Procesa los elementos del historial
        historyItems.forEach((item) => {
            console.log(item.url);
            // Realiza las acciones necesarias con cada elemento del historial
        });
    });
});


// Datos de prueba del historial de navegación
const historyData = [
    { url: 'https://www.example.com/page1', title: 'Página 1' },
    { url: 'https://www.example.com/page2', title: 'Página 2' },
    // Agrega más objetos de historial de prueba aquí
];

// Obtener el historial de navegación de prueba
function getMockHistory(callback) {
    callback(historyData);
}

// Llama a la función getMockHistory en lugar de chrome.history.search
getMockHistory((historyItems) => {
    // Procesa los elementos del historial de navegación de prueba
    historyItems.forEach((item) => {
        console.log(item.url);
        // Realiza las acciones necesarias con cada elemento del historial
    });
}); */

// Función para obtener el contenido de la página web actual
function getCurrentPageContent(callback) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (tabs.length > 0) {
      console.log('tabs length > 0');
      var tab = tabs[0];
      console.log('%c 🍇 tab: ', 'font-size:12px;background-color: #4b4b4b;color:#fff;', tab);
      chrome.tabs.sendMessage(tab.id, {
        action: 'getContent'
      }, function (response) {
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

/* (async () => {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    console.log('%c 🥦 tab: ', 'font-size:12px;background-color: #42b983;color:#fff;', tab);
    const response = await chrome.tabs.sendMessage(tab.id, { greeting: "hello" });
    // do something with response here, not outside the function
    console.log(response);
})(); */

// Llamada a getCurrentPageContent
getCurrentPageContent(function (content) {
  console.log(content);
  fetch('http://127.0.0.1:5000/api/html', {
    method: 'POST',
    body: new URLSearchParams({
      'html': content,
      'url': 'https://www.google.com',
      'title': 'Página 2'
    })
  }).then(function (response) {
    return response.text();
  }).then(function (data) {
    console.log(data); // Muestra la respuesta recibida desde la API
  })["catch"](function (error) {
    console.error('Error:', error);
  });
  // Haz algo con el contenido de la página web actual
});
/******/ })()
;
//# sourceMappingURL=background.js.map