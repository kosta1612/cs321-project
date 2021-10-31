// const blacklistedUrls = [
//     "facebook.com",
//     "youtube.com",
//     "reddit.com",
//     "twitter.com",
//     "instagram.com",
//     "netflix.com",
//     "hulu.com",    
//     ];
    
//     function alertUser(){
//         alert("You cannot visit this website");
//         console.log("a chrome message should have been sent?");
//         // chrome.runtime.sendMessage({alert: "You cannot visit this website"});

//     }

//     function displayCurrentList(){
//         let s = "<ul>";
//         for (var i = 0; i < blacklistedUrls.length; i++) {
//             s += "<li>" + blacklistedUrls[i] + "</li>";
//         }
//         s += "</ul>";
//         document.querySelector("#current_list_blacklisted").innerHTML = s;
//     }


// document.addEventListener('DOMContentLoaded', function() {
//     document.querySelector("#start").addEventListener("click", function(){
//         var seconds = 0;
//         var interval;
//         function pomodoro(mins){
//             var seconds = mins * 60 || 0;
//             interval = setInterval(function() {
//                 document.querySelector("#clock").innerHTML = --seconds;
//                 if (seconds <= 0) {
//                     clearInterval(interval);
//                     // alertUser();
//                 }
//             }, 1000);
//         }
//     });
// });


// // displayCurrentList();
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     if (changeInfo.status == "complete"){   
//         displayCurrentList();
//         for (var i = 0; i < blacklistedUrls.length; i++) {
//             if (tab.url.includes(blacklistedUrls[i])) {
//                 alertUser();
//                 break;
//             }   
//         }

//         document.querySelector("#start").addEventListener("click", function(){
//             console.log("start button clicked");
//             console.log("study time: " + document.querySelector("#study_time"));
//             console.log("break time: " + document.querySelector("#break_time"));
//         });

//         // add to the blacklisted urls
//         document.querySelector("#add").addEventListener("click", function(){
//             let url = document.querySelector("#blacklist_url").value;
//             if (blacklistedUrls.includes(url)){
//                 console.log("url already in list");
//             }
//             else{
//                 blacklistedUrls.push(url);
//                 alert("Added " + url + " to the blacklist");
//             } 
//             console.log(blacklistedUrls);
//         });

//         // remove from the blacklisted urls
//         document.querySelector("#remove").addEventListener("click", function(){
//             let url = document.querySelector("#blacklist_url").value;
//             if (blacklistedUrls.includes(url)){
//                 blacklistedUrls.splice(blacklistedUrls.indexOf(url), 1);
//                 alert("Removed " + url + " from the blacklist");
//             }
//             else{
//                 console.log("url not in list");
//             }
//             console.log(blacklistedUrls);
//         });
//     }

// });
