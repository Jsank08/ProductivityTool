var websiteUrl;
var websiteHostName;

chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
    websiteUrl = tabs[0].url;
    websiteHostName = new URL(tabs[0].url).hostname;

    document.getElementById("url").innerText = websiteHostName;
});

function ShowError(text) {
    var div = document.createElement('div');
    div.setAttribute('id', 'ERRORcontainer');
    div.innerHTML = `
                <div class="ERROR">
                    <p>${text}</p>     
                </div>`
    document.getElementsByClassName("bottomItem")[0].appendChild(div)

    setTimeout(() => {
        document.getElementById("ERRORcontainer").remove()
    }, 3000)
}

document.getElementById('btn').addEventListener('click', () => {
    console.log('buttonnnnnn clickeddd :>> ');

    if (websiteUrl.toLowerCase().includes("chrome://")) {
        ShowError("You cannot block a chrome URL")
    } else {
        chrome.storage.local.get("BlockedUrls", (data) => {
            console.log('data :>> ', data);
    debugger;
            if (data.BlockedUrls === undefined) {
                chrome.storage.local.set({ BlockedUrls: [{ status: "In_Progress", url: websiteHostName}]});

                chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, {from: "Popup", subject: "Start_Timer"});
                });
            } else {
                if (data.BlockedUrls.some((e) => e.url === websiteHostName && e.status === "In_Progress")) {
                    ShowError("This site is being blocked.");
                    
                } else if (data.BlockedUrls.some((e) => e.url === websiteHostName && e.status === "BLOCKED")) {
                    ShowError("This site is blocked for the day.");
                } else {
                    chrome.storage.local.set({ BlockedUrls: [ ...data.BlockedUrls, { status: "In_Progress", url: websiteHostName}]});

                    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                        chrome.tabs.sendMessage(tabs[0].id, {from: "Popup", subject: "Start_Timer"});
                    });
                }
                
            }
        });
    }

});


