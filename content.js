// content.js - SIMPLE WORKING VERSION
console.log('GoingDark loaded');

let currentMode = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Received:', request.command, request.mode);
    
    const html = document.documentElement;
    
    // Clean all classes
    const classes = [
        'goingdark-active',
        'goingdark-mode-green',
        'goingdark-mode-bw', 
        'goingdark-mode-cyan'
    ];
    
    classes.forEach(cls => html.classList.remove(cls));
    
    if (request.command === 'applyMode') {
        // Add dark theme
        html.classList.add('goingdark-active');
        
        // Add specific mode
        const modeClass = `goingdark-mode-${request.mode}`;
        html.classList.add(modeClass);
        
        currentMode = request.mode;
        console.log('Mode activated:', request.mode);
        
    } else if (request.command === 'reset') {
        currentMode = null;
        console.log('All effects removed');
    }
    
    sendResponse({ success: true, mode: currentMode });
    return true;
});