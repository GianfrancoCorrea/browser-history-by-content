const cacheSize = 10; // Tamaño máximo de la caché
let cache = new Map(); // Diccionario para almacenar las respuestas
let lruList = []; // Lista enlazada para realizar un seguimiento del orden de uso


function loadLocalCache() {
    chrome.storage.local.get(['cache', 'lruList'], function (result) {
        if (result.cache) {
            cache = new Map(result.cache);
        }

        if (result.lruList) {
            lruList = result.lruList;
        }

        console.log('Cache loaded from local storage');

    });
}

function clearLocalCache() {
    chrome.storage.local.clear(function () {
        console.log('Cache cleared from local storage');
    });
}

function updateLocalCache() {
    chrome.storage.local.set({ cache: Array.from(cache), lruList: lruList }, function () {
        console.log('Cache updated in local storage');
    });
}

// Función para agregar una entrada a la caché
function addToCache(url, response) {
    // Agregar la entrada al diccionario
    cache.set(url, response);

    // Agregar la entrada al frente de la lista enlazada
    lruList.unshift(url);

    // Si la lista enlazada excede el tamaño máximo, eliminar la entrada menos reciente
    if (lruList.length > cacheSize) {
        const removedUrl = lruList.pop();
        cache.delete(removedUrl);
    }

    // Actualizar el almacenamiento local
    updateLocalCache()
}

function getFromCache(url) {
    // Si la entrada existe en la caché, devolverla
    if (cache.has(url)) {
        return cache.get(url);
    }

    // Si la entrada no existe en la caché, devolver null
    return null;
}

function clearCache() {
    // Limpiar la caché
    cache.clear();
    lruList.length = 0;

    // Actualizar el almacenamiento local
    clearLocalCache();
}

// Exportar las funciones
export { addToCache, getFromCache, clearCache, loadLocalCache };

