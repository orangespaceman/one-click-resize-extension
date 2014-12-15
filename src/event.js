function resizeWindow (tab) {

    var storedValues = ['width', 'height', 'left', 'top'];

    chrome.storage.local.get(storedValues, function (response) {

        var hasStoredValues = true;
        storedValues.forEach(function (index) {
            if (!response[index]) {
                hasStoredValues = false;
            }
        });

        // if this is the first time the script is run,
        // values won't be set, so send the user to the options page to set them
        if (!hasStoredValues) {
            chrome.tabs.create({url: "options/index.html"});
        } else {

            // values exist, resize
            chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, {
                 width: parseInt(response.width, 10),
                 height: parseInt(response.height, 10),
                 left: parseInt(response.left, 10),
                 top: parseInt(response.top, 10)
            });
        }

        return true;
    });
}

// Add listener to chrome extension button click
chrome.browserAction.onClicked.addListener(resizeWindow);