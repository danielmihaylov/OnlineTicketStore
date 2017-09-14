handlers.login = function () {
    auth.loginStatusCheck(this);
    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        loginForm: './templates/login/loginForm.hbs'
    }).then(function () {
        this.partial('./templates/login/loginView.hbs');
    })
};

handlers.loginAction = function (ctx) {
    let username = ctx.params.username;
    let password = ctx.params.passwd;

    auth.login(username, password)
        .then(function (data) {
            auth.saveSession(data);
            ctx.redirect('#/home');
        })
        .catch(function (reason) {
            auth.handleError(reason);
        })

};

handlers.register = function () {
    auth.loginStatusCheck(this);

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        registerForm: './templates/register/registerForm.hbs'
    }).then(function () {
        this.partial('./templates/register/registerView.hbs');
    })
};

handlers.registerAction = function (ctx) {
    let userdata = {
        firstName: ctx.params.firstName,
        lastName: ctx.params.lastName,
        email: ctx.params.email,
        username: ctx.params.username,
        password: ctx.params.passwd
    };

    auth.register(userdata)
        .then(function (data) {
            console.log(data);
            auth.saveSession(data);
            ctx.redirect('#/home');
        })
        .catch(function (reason) {
            auth.handleError(reason);
        })

};

handlers.logout = function (ctx) {
    auth.logout()
        .then(function () {
            sessionStorage.clear();
            ctx.redirect('#/home');
        })
        .catch(function (reason) {
            auth.handleError(reason);
        })
};

handlers.cart = function (ctx) {
    auth.loginStatusCheck(ctx);
    let authentication = '';
    if (ctx.isUnlogged) {
        authentication = 'basic';
    }

    eventService.getAllEvents(authentication)
        .then(function (events) {
            let cartEvents = JSON.parse(sessionStorage.getItem('cart'));
            let eventsData = [];

            for (let entry of cartEvents) {
                for (let event of events) {
                    if (entry.eventId === event._id) {
                        let newEvent = {
                            _id: event._id,
                            star: event.star,
                            category: event.category,
                            date:event.date,
                            location:event.location,
                            quantity:entry.quantity,
                            totalPrice:(Number(event.price)*Number(entry.quantity)).toString(),
                            currency:event.currency
                        };
                        eventsData.push(newEvent);
                    }
                }
            }

            ctx.eventsInCart=eventsData;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                eventInCart: './templates/cart/eventInCart.hbs'
            }).then(function () {
                ctx.partials = this.partials;
                ctx.partial('./templates/cart/cartView.hbs');
            })
        });


};

handlers.removeFromCart = function (ctx) {
    let eventId = ctx.params.eventId.slice(1);
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    cart = cart.filter(e=>e.eventId!==eventId);
    sessionStorage.setItem('cart',JSON.stringify(cart));
    messenger.showInfo('Item removed from the cart');
    ctx.redirect('#/cart');
};

handlers.myAccount = function (ctx) {
    auth.loginStatusCheck(ctx);
    let userId = sessionStorage.getItem('userId');

    userService.getUser(userId)
        .then(function (userInfo) {
            ctx.username = userInfo.username;
            ctx.firstName = userInfo.firstName;
            ctx.lastName = userInfo.lastName;
            ctx.email = userInfo.email;
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                myAccountForm: './templates/myAccount/myAccountForm.hbs'
            }).then(function () {
                ctx.partials = this.partials;
                ctx.partial('./templates/myAccount/myAccountView.hbs');
            })
        })
};

handlers.myAccountEdit = function (ctx) {
    auth.loginStatusCheck(ctx);
    let userId = sessionStorage.getItem('userId');

    userService.getUser(userId)
        .then(function (userInfo) {
            ctx.username = userInfo.username;
            ctx.firstName = userInfo.firstName;
            ctx.lastName = userInfo.lastName;
            ctx.email = userInfo.email;
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                myAccountEditForm: './templates/myAccountEdit/myAccountEditForm.hbs'
            }).then(function () {
                ctx.partials = this.partials;
                ctx.partial('./templates/myAccountEdit/myAccountEditView.hbs');
            })
        })
};

handlers.myAccountEditAction = function (ctx) {
    let userId = sessionStorage.getItem('userId');

    let newUser = {
        username: ctx.params.username,
        firstName: ctx.params.firstName,
        lastName: ctx.params.lastName,
        email: ctx.params.email
    };

    userService.updateUser(userId, newUser)
        .then(function (userInfo) {
            auth.saveSession(userInfo);
            ctx.redirect('#/myAccount');
        })
};

handlers.resetPassword = function (ctx) {
    userService.resetPassword()
        .then(function () {
            messenger.showInfo('Password reset - please check your email');
            sessionStorage.clear();
            ctx.redirect('#/home');
        })
};

handlers.addToCart = function (ctx) {
    if (ctx.params.quantity <= 0) {
        messenger.showError('Invalid ticket quantity');
        return;
    }

    let cartItem = {
        eventId: ctx.params.eventId.slice(1),
        quantity: ctx.params.quantity
    };

    let userCart = sessionStorage.getItem('cart');

    cartService.updateUserCart(userCart, cartItem);

};