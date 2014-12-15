window.addEventListener('load', function () {

    // cache page els
    var widthEl = document.querySelector('input#width');
    var heightEl = document.querySelector('input#height');
    var leftEl = document.querySelector('input#left');
    var topEl = document.querySelector('input#top');
    var savedEl = document.querySelector('.js-saved-note');
    var saveBtn = document.querySelector('.js-save-btn');
    var currentValuesBtn = document.querySelector('.js-current-values');

    // update input text field values on load
    // retrieve values from chrome extension storage
    // setting defaults of current dimensions if no value found
    var storedValues = ['width', 'height', 'left', 'top'];
    chrome.storage.local.get(storedValues, function (items) {
        widthEl.value = items.width || window.outerWidth;
        heightEl.value = items.height || window.outerHeight;
        leftEl.value = items.left || window.screenX;
        topEl.value = items.top || window.screenY;

        // store values on initial page load
        // ensures the options page will only ever appear the first time
        // that the user clicks the resize button
        saveValues();
    });

    // update text field values from current browser dimensions when requested
    currentValuesBtn.addEventListener('click', function (e) {
        e.preventDefault();
        widthEl.value = window.outerWidth;
        heightEl.value = window.outerHeight;
        leftEl.value = window.screenX;
        topEl.value = window.screenY;
    });

    // Save input text field values to chrome extension storage on save
    saveBtn.addEventListener('click', function (e) {
        e.preventDefault();
        saveValues();
    });

    // store values
    function saveValues () {
        // update stored vals
        chrome.storage.local.set({
            width: widthEl.value,
            height: heightEl.value,
            left: leftEl.value,
            top: topEl.value
        }, function () {

            // add saved notification
            savedEl.style.opacity = 1;
            setTimeout(function () {
                savedEl.style.opacity = 0;
            }, 1500);
        });
    }
});