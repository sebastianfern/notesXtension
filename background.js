chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });

chrome.action.onClicked.addListener(async(tab) => {
    

})