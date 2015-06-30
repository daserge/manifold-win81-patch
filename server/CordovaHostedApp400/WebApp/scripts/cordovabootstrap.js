(function () {
    document.getElementById("user-agent").textContent = navigator.userAgent;

    // Look at the query string to see if a platform ID is passed
    var uri = window.location.toString();
    var queryString = {};
    uri.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function ($0, $1, $2, $3) { queryString[$1] = $3; }
    );

    // If so, persist it in local storage, otherwise grab the value from local storage 
    var platformId;
    if (typeof (queryString.platformId) != "undefined") {
        sessionStorage.setItem("__cordovabootstrap.platformId", queryString.platformId);
        console.log("Platform specified in query string - setting values in sessionStorage for " + queryString.platformId);
        alert("Platform specified in query string - setting values in sessionStorage for " + queryString.platformId);
    }
    //platformId = sessionStorage.getItem("__cordovabootstrap.platformId");
    platformId = 'windows'; // temp hack
    document.getElementById("device-detected").textContent = platformId;//queryString.platformId;
    var scriptElem = document.createElement('script');
    scriptElem.setAttribute("src", "cordova/" + platformId + "/cordova.js");
    document.head.appendChild(scriptElem);
})();