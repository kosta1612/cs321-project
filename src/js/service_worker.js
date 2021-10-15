// a list of blacklisted urls
const blacklistedUrls = [
"facebook.com",
"youtube.com",
];

chrome.tabs.onCreated.addListener(function(tab) {
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (changeInfo.status == "complete") {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var url = tabs[0].url;
                for (var i = 0; i < blacklistedUrls.length; i++) {
                    if (url.includes(blacklistedUrls[i])) {
                        console.log("blacklisted url");
                    }
                }
            });
        }
    });
});