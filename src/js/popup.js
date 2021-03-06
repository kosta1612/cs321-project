var blacklistedUrls = [
    "facebook.com",
    "youtube.com",
    "reddit.com",
    "twitter.com",
    "instagram.com",
    "netflix.com",
    "hulu.com",    
];
var blacklistVisitCounter = 0;
var stop = false;
    
function alertUser(){
    alert("You cannot visit this website");
}

function startStudyTimer(minutes){
    timer(minutes);
}

function startBreakTimer(minutes){
    timer(minutes);
}

function displayCurrentList(){
    let s = "<ul>";
    for (var i = 0; i < blacklistedUrls.length; i++) {
        s += "<li>" + blacklistedUrls[i] + "</li>";
    }
    s += "</ul>";
    document.querySelector("#current_list_blacklisted").innerHTML = s;
}

function addBee(color){ // color is a string that is either "green" or "red"
    document.querySelector("#visual").innerHTML = "<div class=\"wrapper " + color + "\"><div class=\"bee\"><div class=\"bee-body\"><div class=\"blink\"></div><div class=\"mouth\"></div><div class=\"antenae\"></div><div class=\"bee-left\"></div><div class=\"bee-right\"></div></div></div></div>";
}

function timer(minutes) {
    var seconds = 60;
    var mins = minutes;
    var counter = document.querySelector("#clock");
    var current_minutes = mins-1;
    if(stop == true){
        // counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        document.querySelector("#visual").innerHTML = " ";
    }
    else{
    //    addGreenBee();
    addBee("w3-green");
    }
    // addGreenBee();
    function tick() {
        seconds--;
        console.log("minutes: " + current_minutes);
        console.log("seconds: " + seconds);
        console.log("stop: " + stop);
        if(stop != true){
            // counter.innerHTML = "Blacklist Visits: " + blacklistVisitCounter;
            counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        }
        else{
            counter.innerHTML = "Timer Stopped";
        }
        // addGreenBee();
        // if minites = 0 and seconds = 0 then stop
        if(current_minutes == 0 && seconds == 0){
            console.log("Gets here");
            document.querySelector("#visual").innerHTML = "Blacklisted Sites Visited: "  + blacklistVisitCounter;
            return;
        }
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            if(mins > 1){
                // countdown(mins-1);   never reach ???00??? issue solved:Contributed by Victor Streithorst
                setTimeout(function () { timer(mins - 1); }, 1000);
            }
        }
    }
    document.querySelector("#stop").addEventListener("click", function(){
        console.log("stop");
        counter.innerHTML = "Timer Stopped";
        // document.querySelector("#visual").innerHTML = "";
        document.querySelector("#visual").innerHTML = "Blacklisted Sites Visited: "  + blacklistVisitCounter;
        stop = true;
        return;
    });

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
            if (changeInfo.status == "complete"){   
                displayCurrentList();
                for (var i = 0; i < blacklistedUrls.length; i++) {
                    if (tab.url.includes(blacklistedUrls[i])) {
                        alertUser();
                        // addRedBee();
                        addBee("w3-red");
                        blacklistVisitCounter++;
                        console.log("Blacklisted Sites Visited: "  + blacklistVisitCounter);
                        break;
                    }  
                }
            }
        });
    tick();
}

document.addEventListener('DOMContentLoaded', function() {
    displayCurrentList();

    var study_min = 0;
    var break_min = 0;

    // set get the study mintutes
    document.querySelector("#set_study_min").addEventListener("click", function(){
        console.log("set_study_min");
        study_min = document.querySelector("#study-min").value;
        console.log(study_min);
        alert("Study time set to " + study_min + " minute/s");
    });

    // get the break minutes
    document.querySelector("#set_break_min").addEventListener("click", function(){
        console.log("set_break_min");
        break_min = document.querySelector("#break-min").value;
        console.log(break_min);
        alert("Break time set to " + break_min + " minute/s");
    });

    // start the timer with start button is clicked
    document.querySelector("#start").addEventListener("click", function(){
        // console.log("start");
        startStudyTimer(study_min);
        stop = false;
    });

    // add to the blacklisted urls
    document.querySelector("#add").addEventListener("click", function(){
        console.log("add button clicked");
        let url = document.querySelector("#blacklist_url").value;
        if (url === "" || blacklistedUrls.includes(url)){
            alert("Enter valid URL");
        }
        else{
            blacklistedUrls.push(url);
            alert("Added " + url + " to the blacklist");
        } 
        console.log(blacklistedUrls);
        displayCurrentList();
    });


    // remove from the blacklisted urls
    document.querySelector("#remove").addEventListener("click", function(){
        console.log("remove button clicked");
        let url = document.querySelector("#blacklist_url").value;
        console.log(url);
        if (blacklistedUrls.includes(url)){
            blacklistedUrls.splice(blacklistedUrls.indexOf(url), 1);
            alert("Removed " + url + " from the blacklist");
        }
        else{
            alert("url not in list");
        }
        console.log(blacklistedUrls);
        displayCurrentList();
    });
});