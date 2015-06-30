//alert('index2.js');

// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

var takeAPicHandler = function () {
    console.log('take-a-pic');
    alert('takeAPicHandler');
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: 0
    });

    function onSuccess(imageData) {
        console.log('take-a-pic onSuccess');
        var image = document.getElementById('image');
        image.src = "data:image/jpeg;base64," + imageData;
        document.getElementById("pic-result").textContent = "data:image/jpeg;base64,...";
    }

    function onFail(message) {
        console.log('take-a-pic onFail: ' + message + ': ' + JSON.stringify(message));
        document.getElementById("take-a-pic").textContent = "Failed because: " + message;
    }
};

var takeAPicFileHandler = function () {
    console.log('take-a-pic-file');
    console.log('take-a-pic-file upd');
    alert('takeAPicFileHandler');
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: 1
    });

    function onSuccess(imageURI) {
        alert('imageURI: ' + imageURI);
        var image = document.getElementById('image');
        window.resolveLocalFileSystemURL(imageURI, function (entry) {
            alert('entry: ' + JSON.stringify(entry));
            image.src = entry.toURL();
            document.getElementById("pic-result").textContent = image.src;

            entry.file(function (file) {
                var reader = new FileReader();
                alert('reader: ' + reader + '; reader.readAsText: ' + reader.readAsText);
                reader.onload = function(evt, fileData, fileDataAsBinaryString) {
                    fileData = evt.target.result;

                    console.log('evt: ' + evt + ': ' + JSON.stringify(evt));
                    console.log('fileData: ' + fileData + ': ' + JSON.stringify(fileData));
                    console.log('fileDataAsBinaryString: ' + fileDataAsBinaryString + ': ' + JSON.stringify(fileDataAsBinaryString));

                    alert('evt: ' + evt + ': ' + JSON.stringify(evt));
                    alert('fileData: ' + fileData + ': ' + JSON.stringify(fileData));
                    alert('fileDataAsBinaryString: ' + fileDataAsBinaryString + ': ' + JSON.stringify(fileDataAsBinaryString));
                };
                reader.onloadend = function(evt, fileData, fileDataAsBinaryString) {
                    fileData = evt.target._result;

                    image.src = fileData;

                    console.log('end evt: ' + evt + ': ' + JSON.stringify(evt));
                    console.log('end fileData: ' + fileData + ': ' + JSON.stringify(fileData));
                    console.log('end fileDataAsBinaryString: ' + fileDataAsBinaryString + ': ' + JSON.stringify(fileDataAsBinaryString));

                    alert('end evt: ' + evt + ': ' + JSON.stringify(evt));
                    alert('end fileData: ' + fileData + ': ' + JSON.stringify(fileData));
                    alert('end fileDataAsBinaryString: ' + fileDataAsBinaryString + ': ' + JSON.stringify(fileDataAsBinaryString));
                };
                reader.onerror = function(err) {
                    console.log('err: ' + err + ': ' + JSON.stringify(err));
                    alert('err: ' + err + ': ' + JSON.stringify(err));
                };

                //reader.readAsText(file);

                reader.readAsDataURL(file);
            }, function(err) {
                console.log('err: ' + err + ': ' + JSON.stringify(err));
                alert('err: ' + err + ': ' + JSON.stringify(err));
            });
        }, onFail);
    }

    function onFail(message) {
        document.getElementById("take-a-pic-file").textContent = "Failed because: " + message;
    }

};

var testWinjs = function() {
    console.log("testWinjs");
    alert("testWinjs");
};

alert = alert || navigator.notification.alert;

var GLOB = (function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        //alert('test');
        console.log('onDeviceReady');
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        document.getElementById("cordova-loaded").textContent = "CORDOVA DEVICE READY FIRED!!";

        // Demo using DATA_URI - No need for the File plugin 
        document.getElementById("take-a-pic").addEventListener("click", takeAPicHandler);

        // Demo using FILE_URI and converting it to a cdvfile:// reference 
        // to get around XSS restrictions using the File plugin
        document.getElementById("take-a-pic-file").addEventListener("click", takeAPicFileHandler);

        document.getElementById("test-winjs").addEventListener("click", testWinjs);

        document.getElementById("injectTest").addEventListener("click", function() {
            if (window.test) {
                window.test();
            } else {
                console.log('window.test: ' + window.test);
            }
        });

        window.execCallback = function (opts) {
            console.log('HOST window.execCallback');
            var optsObj = JSON.parse(opts);
            var execCb = window.cordova.require('cordova/exec/callback');

            if (optsObj.success === true) {
                execCb.onSuccess(opts);
            } else {
                execCb.onError(opts);
            }
        };
        console.log("window.execCallback: " + window.execCallback);
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    onDeviceReady(); //temp hack
    return {
        onDeviceReady: onDeviceReady
    };

})();