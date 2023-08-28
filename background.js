// let injectedTabIds = new Set();

// chrome.action.onClicked.addListener(async (tab) => {
//     const tabId = tab.id;
    
//     // Toggle the badge and handle the action click
//     const prevState = await chrome.action.getBadgeText({ tabId: tabId });
//     const nextState = prevState === 'ON' ? 'OFF' : 'ON';

//     await chrome.action.setBadgeText({
//         tabId: tabId,
//         text: nextState
//     });

//     if (nextState === 'ON') {
//         if (!injectedTabIds.has(tabId)) {
//             // Inject the content script only if it has not been injected into this tab yet
//             await chrome.scripting.executeScript({
//                 target: { tabId: tabId },
//                 files: ['content-scripts/content.js']
//             }).catch(err => console.error('Error injecting script:', err)); // Error handling
            
//             // Add the tab ID to the set of injected tabs
//             injectedTabIds.add(tabId);
//         }
//     } else {
//         // Unload or disable the content script if you have a mechanism to do so
//         // Remove the tab ID from the set of injected tabs
//         injectedTabIds.delete(tabId);
//     }
// });


