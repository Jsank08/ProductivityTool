chrome.runtime.onMessage.addListener((message, sender) => {
    console.log("message form google tab");


    var div = document.createElement("div")
    div.innerHTML = `
        <div class="STAYPtopItem">
            <h1>Stay Productive</h1>
            <div class="STAYPtopItemMain">
                <div class="STAYPInfo">
                    <p>You are currently on :</p>
                    <h4 id="STAYPurl">${window.location.hostname}</h4>
                </div>
            </div>
        </div>

        <div class="STAYPbottomItem">
            <div class="STAYPtimeCont">
                <p>Time Remaining</p>
                <div class="STAYPtime">
                    <div class="STAYPnumber">
                        <p id="STAYPhour">${("0" + hour).slice(-2)}</p>
                    </div>
                    <span>:</span>
    
                    <div class="STAYPnumber">
                        <p id="STAYPmin">${("0" + min).slice(-2)}</p>
                    </div>
                    <span>:</span>
    
                    <div class="STAYPnumber">
                        <p id="STAYPsec">${("0" + sec).slice(-2)}</p>
                    </div>
                </div>
            </div>
        </div>`;
    document.body.prepend(div)

});