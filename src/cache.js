const cacheSize = 10;
let cache = new Map();
let lruList = [];


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


function addToCache(url, response) {
    cache.set(url, response);

    lruList.unshift(url);

    if (lruList.length > cacheSize) {
        const removedUrl = lruList.pop();
        cache.delete(removedUrl);
    }

    updateLocalCache()
}

function getFromCache(url) {
    if (cache.has(url)) {
        return cache.get(url);
    }

    return null;
}

function clearCache() {
    cache.clear();
    lruList.length = 0;

    clearLocalCache();
}

export { addToCache, getFromCache, clearCache, loadLocalCache };
