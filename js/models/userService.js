let userService = (() => {
    function getUser(userId) {
        return requester.get('user', `${userId}`, '');
    }

    function updateUser(userId, newUser) {
        return requester.update('user', `${userId}`, '', newUser);
    }

    function resetPassword() {
        let username = sessionStorage.getItem('username');
        return requester.post('rpc',`${username}/user-password-reset-initiate`,'basic');
    }

    function addToCart(cartItem,userId) {
        return requester.post('user',`${userId}`,'',)
    }

    return {
        getUser,
        updateUser,
        resetPassword
    }
})();