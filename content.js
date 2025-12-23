// content.js - GoingDark Content Script (No Spotlight)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    // Remove any existing "GoingDark" mode classes first
    const allModeClasses = ['goingdark-mode-green', 'goingdark-mode-bw', 'goingdark-mode-cyan'];
    htmlElement.classList.remove(...allModeClasses);
    bodyElement.classList.remove(...allModeClasses);
    htmlElement.classList.remove('goingdark-active');
    bodyElement.classList.remove('goingdark-active');

    // Remove any inline styles that might interfere
    htmlElement.style.cssText = '';
    bodyElement.style.cssText = '';

    if (request.command === 'applyMode') {
        // Apply dark theme base class FIRST
        htmlElement.classList.add('goingdark-active');
        bodyElement.classList.add('goingdark-active');
        
        // Apply the specific mode class
        const newModeClass = `goingdark-mode-${request.mode}`;
        htmlElement.classList.add(newModeClass);
        bodyElement.classList.add(newModeClass);
        
        console.log(`GoingDark: Applied ${request.mode} mode with auto-dark theme.`);
        
        // Store current mode for status queries
        window.goingDarkActiveMode = request.mode;
        sendResponse({success: true, mode: request.mode});

    } else if (request.command === 'reset') {
        window.goingDarkActiveMode = null;
        console.log('GoingDark: All effects disabled, page restored.');
        sendResponse({success: true});
        
    } else if (request.command === 'getStatus') {
        // Return current status to popup
        sendResponse({
            activeMode: window.goingDarkActiveMode || null,
            timestamp: new Date().toISOString()
        });
        return true; // Keep message channel open for async response
    }

    return true;
});

// Add dark theme to all new elements dynamically
const observer = new MutationObserver(function(mutations) {
    if (document.documentElement.classList.contains('goingdark-active')) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    node.classList.add('goingdark-active');
                }
            });
        });
    }
});

// Start observing
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initialize window variable
window.goingDarkActiveMode = null;
