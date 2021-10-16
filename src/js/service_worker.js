// a list of blacklisted urls
const blacklistedUrls = [
"facebook.com",
"youtube.com",
"mymasonportal.gmu.edu", // added for testing
"patriotweb.gmu.edu"
];

function alertUser(){
    alert("You cannot visit this website");
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == "complete"){
        console.log("Url change completed");
        console.log("URL Loaded: " + tab.url);
        for (var i = 0; i < blacklistedUrls.length; i++) {
            if (tab.url.includes(blacklistedUrls[i])) {
                console.log("User visited a blacklisted url");
                alertUser();
            }
        }
    }
});