// popup.js - SIMPLE WORKING VERSION
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-mode[data-mode]');
    const offButton = document.getElementById('btn-off');
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    const modeIndicator = document.querySelector('.mode-indicator');
    
    let currentMode = null;
    
    function sendCommand(command, mode = null) {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]?.id) {
                chrome.tabs.sendMessage(tabs[0].id, {command, mode}, (response) => {
                    if (chrome.runtime.lastError) {
                        console.log('Error:', chrome.runtime.lastError.message);
                        // Try to inject content script
                        chrome.scripting.executeScript({
                            target: {tabId: tabs[0].id},
                            files: ['content.js']
                        }).then(() => {
                            // Retry after injection
                            setTimeout(() => {
                                chrome.tabs.sendMessage(tabs[0].id, {command, mode});
                            }, 500);
                        });
                    }
                });
            }
        });
    }
    
    function updateUI(mode) {
        currentMode = mode;
        
        // Update buttons
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-mode') === mode) {
                btn.classList.add('active');
            }
        });
        
        // Update status
        if (statusDot) {
            statusDot.classList.toggle('active', !!mode);
        }
        
        if (statusText) {
            statusText.textContent = mode ? `ACTIVE: ${mode.toUpperCase()}` : 'READY';
        }
        
        if (modeIndicator) {
            modeIndicator.textContent = mode ? `${mode.toUpperCase()} MODE` : 'READY';
        }
    }
    
    // Button events
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const mode = button.getAttribute('data-mode');
            sendCommand('applyMode', mode);
            updateUI(mode);
        });
    });
    
    // Off button
    offButton.addEventListener('click', () => {
        sendCommand('reset');
        updateUI(null);
    });
});