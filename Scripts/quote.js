var quotenumber = 0;
var timeoutId = null;
var feed;
var result;

function initialize() {
    if (sourceFeed == "custom")
    {
        sourceFeed = customUrl;
    }
    feed = new google.feeds.Feed(sourceFeed);
    feed.setNumEntries(100);
    if (timeoutId != null) {
        clearTimeout(timeoutId);
    }
    feed.load(loopQuote);
 }

function loopQuote(result) {
    if (!result.error) {
        var container = document.getElementById("feed");
        var entry = result.feed.entries[quotenumber];
        container.style.color = fontColor;
        container.style.fontSize = fontSize + "px";
        container.style.fontFamily = fontName;
        container.innerHTML = "<blockquote>" + entry.content + "<cite>" + entry.title + "</cite>" + "</blockquote>";
        quotenumber++;
        timeoutId = setTimeout(function() {
            if (quotenumber == result.feed.entries.length) {
                quotenumber = 0;
                initialize();
            } else {
                loopQuote(result);
            }
        }, (interval_time * 3600000));
    }
}
