chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({file: "jquery-1.11.1.js"});
  chrome.tabs.executeScript({file: "fantasy_team_stats.js"});
});
