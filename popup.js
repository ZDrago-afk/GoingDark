// popup.js - GoingDark Popup Controller (No Spotlight)
document.addEventListener('DOMContentLoaded', function() {
    const modeButtons = document.querySelectorAll('.btn-mode[data-mode]');
    const offButton = document.getElementById('btn-off');
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    const modeIndicator = document.querySelector('.mode-indicator');
    
    let currentMode = null;

    // Function to send command to active tab
    function sendCommandToTab(command, mode = null) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { command, mode }, function(response) {
                    if (chrome.runtime.lastError) {
                        console.log('Content script not ready, injecting...');
                        // Content script should auto-inject, but we can retry
                        setTimeout(() => {
                            chrome.tabs.sendMessage(tabs[0].id, { command, mode });
                        }, 100);
                    }
                });
            }
        });
    }

    // Update UI to show active mode
    function updateUIMode(activeMode) {
        currentMode = activeMode;
        
        // Remove active class from all buttons
        modeButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        if (activeMode) {
            const activeBtn = document.querySelector(`[data-mode="${activeMode}"]`);
            if (activeBtn) activeBtn.classList.add('active');
        }
        
        // Update status indicator
        if (statusDot) {
            statusDot.classList.toggle('active', !!activeMode);
            if (activeMode) {
                const color = activeMode === 'green' ? '#0af575' : 
                            activeMode === 'bw' ? '#ccc' : '#0ff';
                statusDot.style.backgroundColor = color;
            }
        }
        
        // Update status text
        if (statusText) {
            if (activeMode) {
                const modeNames = {
                    'green': 'Green Night Vision Active',
                    'bw': 'Black & White Static Active',
                    'cyan': 'Cyber Scan Active'
                };
                statusText.textContent = modeNames[activeMode];
                statusText.style.color = activeMode === 'green' ? '#0af575' : 
                                       activeMode === 'bw' ? '#ccc' : '#0ff';
            } else {
                statusText.textContent = 'Extension Ready';
                statusText.style.color = '#aaa';
            }
        }
        
        // Update mode indicator
        if (modeIndicator) {
            if (activeMode) {
                const modeDisplay = {
                    'green': 'GREEN MODE',
                    'bw': 'B&W MODE',
                    'cyan': 'CYBER MODE'
                };
                modeIndicator.textContent = modeDisplay[activeMode];
                modeIndicator.style.color = activeMode === 'green' ? '#0af575' : 
                                          activeMode === 'bw' ? '#ccc' : '#0ff';
            } else {
                modeIndicator.textContent = 'READY';
                modeIndicator.style.color = '#888';
            }
        }
    }

    // Add event listeners to mode buttons
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedMode = button.getAttribute('data-mode');
            
            // If clicking the already active mode, turn it off
            if (currentMode === selectedMode) {
                sendCommandToTab('reset');
                updateUIMode(null);
            } else {
                sendCommandToTab('applyMode', selectedMode);
                updateUIMode(selectedMode);
            }
        });
    });

    // Add event listener to OFF button
    offButton.addEventListener('click', () => {
        sendCommandToTab('reset');
        updateUIMode(null);
    });

    // Check current page state on popup open
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
            // Try to get status from content script
            chrome.tabs.sendMessage(tabs[0].id, 
                {command: "getStatus"}, 
                function(response) {
                    if (response && response.activeMode) {
                        updateUIMode(response.activeMode);
                    } else {
                        updateUIMode(null);
                    }
                }
            );
        }
    });
});
