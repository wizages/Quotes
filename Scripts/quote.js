var quotenumber = 0;
var timeoutId = null;
var feed;

function initialize() {
    feed = new google.feeds.Feed(sourceFeed);
        feed.load(function(result) {
        if (!result.error) {
            var container = document.getElementById("feed");
            if (quotenumber == result.feed.entries.length) {
                quotenumber = 0;
            }
            var entry = result.feed.entries[quotenumber];
            container.style.color = fontColor;
            container.style.fontSize = fontSize + "px";
            container.style.fontFamily = fontName;
            container.innerHTML = "<blockquote>" + entry.content + "<cite>" + entry.title +"</cite>" + "</blockquote>";
            quotenumber++;
        }
    });
    if (timeoutId != null) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(function() {
        initialize();

    }, (interval_time*3600000));

}
