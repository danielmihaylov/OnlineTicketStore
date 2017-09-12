let requester = (() => {
    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "kid_ryGHXTOvb";
    const kinveyAppSecret = "e708ad84ba49439287fbd21d985b4950";
    const kinveyAppAuthHeadersGuest = 'Basic ' + btoa('guest' + ':' + 'guest');

    // Creates the authentication header
    function makeAuth(type, isGuest) {
        if (isGuest) {
            return kinveyAppAuthHeadersGuest;
        }
        return type === 'basic'
            ? 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
            : 'Kinvey ' + sessionStorage.getItem('authtoken');
    }

    // Creates request object to kinvey
    function makeRequest(method, module, endpoint, auth, isGuest) {
        return req = {
            method,
            url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint,
            headers: {
                'Authorization': makeAuth(auth, isGuest)
            }
        };
    }

    // Function to return GET promise
    function get(module, endpoint, auth, isGuest) {
        return $.ajax(makeRequest('GET', module, endpoint, auth, isGuest));
    }

    // Function to return POST promise
    function post(module, endpoint, auth, data) {
        let req = makeRequest('POST', module, endpoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    // Function to return PUT promise
    function update(module, endpoint, auth, data) {
        let req = makeRequest('PUT', module, endpoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    // Function to return DELETE promise
    function remove(module, endpoint, auth) {
        return $.ajax(makeRequest('DELETE', module, endpoint, auth));
    }

    return {
        get,
        post,
        update,
        remove
    }
})();