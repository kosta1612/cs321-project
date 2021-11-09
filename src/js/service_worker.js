const blacklistedUrls = [
    "facebook.com",
    "youtube.com",
    "reddit.com",
    "twitter.com",
    "instagram.com",
    "netflix.com",
    "hulu.com",    
    ];
    
    function alertUser(){
        alert("You cannot visit this website");
        console.log("a chrome message should have been sent?");
        // chrome.runtime.sendMessage({alert: "You cannot visit this website"});

    }

    function displayCurrentList(){
        let s = "<ul>";
        for (var i = 0; i < blacklistedUrls.length; i++) {
            s += "<li>" + blacklistedUrls[i] + "</li>";
        }
        s += "</ul>";
        document.querySelector("#current_list_blacklisted").innerHTML = s;
    }
window.onload = function() {	
	document.getElementById("add").addEventListener("click", function(){
		let url = document.querySelector("#blacklist_url").value;
		if (blacklistedUrls.includes(url)){
			console.log("url already in list");
		}
		else{
			blacklistedUrls.push(url);
			alert("Added " + url + " to the blacklist");
			alert(blacklistedUrls);
		} 
		console.log(blacklistedUrls);
	});

	// remove from the blacklisted urls
	document.getElementById("remove").addEventListener("click", function(){
		let url = document.querySelector("#blacklist_url").value;
		if (blacklistedUrls.includes(url)){
			blacklistedUrls.splice(blacklistedUrls.indexOf(url), 1);
			alert("Removed " + url + " from the blacklist");
		}
		else{
			console.log("url not in list");
		}
		console.log(blacklistedUrls);
	});

// displayCurrentList();
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if (changeInfo.status == "complete"){
			displayCurrentList();
			for (var i = 0; i < blacklistedUrls.length; i++) {
				if (tab.url.includes(blacklistedUrls[i])) {
					alertUser();
					break;
				}   
			}
			// add to the blacklisted urls

		}

	});
};