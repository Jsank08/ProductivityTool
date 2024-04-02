var websiteUrl;
var websiteHostName;

chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
    websiteUrl = tabs[0].url;
    websiteHostName = new URL(tabs[0].url);
});

setTimeout(() => {
    console.log('websiteUrl :>> ', websiteUrl);
console.log('websiteHostName  :>> ', websiteHostName );
}, 1000);

