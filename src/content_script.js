// Listen for messages sent from background.js.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getContent') {
        // Get the content of the web page.
        const pageContent = document.documentElement.innerHTML;
        // Send the content back to background.js.
        sendResponse({ content: pageContent });
    }
});
