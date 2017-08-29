let auth = (() => {
    function saveSession(userInfo) {
        sessionStorage.clear();
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);

        //Not Working
        // sessionStorage.setItem('firstName',userInfo.firstName);
        // sessionStorage.setItem('lastName',userInfo.lastName);
        // sessionStorage.setItem('email',userInfo.email);
    }

    // user/login
    function login(username, password) {
        let userData = {
            username,
            password
        };

        return requester.post('user', 'login', 'basic', userData);
    }

    // user/register
    function register(userData) {
        return requester.post('user', '', 'basic', userData);
    }

    // user/logout
    function logout() {
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };

        return requester.post('user', '_logout', '', logoutData);
    }

    function handleError(reason) {
        messenger.showError(reason.responseJSON.description);
    }

    function loginStatusCheck(ctx) {
        if (sessionStorage.hasOwnProperty('authtoken')) {
            let username = sessionStorage.getItem('username');
            if(username === 'admin'){
                ctx.isAdmin = true;
                ctx.isUser = false;
                ctx.username = sessionStorage.getItem('username');
                return ctx;
            }else{
                ctx.isAdmin = false;
                ctx.isUser = true;
                ctx.username = sessionStorage.getItem('username');
            }
        } else {
            ctx.isAdmin = false;
            ctx.isUser = false;
        }
    }

    return {
        login,
        register,
        logout,
        saveSession,
        handleError,
        loginStatusCheck
    }
})();