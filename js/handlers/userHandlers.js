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

handlers.cart = function () {
    auth.loginStatusCheck(this);

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/cart/cartView.hbs');
    })
};

//ADD TICKETS IN THE CART

handlers.addInCart = function (ctx) {
    let eventId = ctx.params.eventId.slice(1);
    auth.loginStatusCheck(this);
    let product = {};
    console.log(ctx.params.countTickets)
    product.countTickets = ctx.params.countTickets;
    eventService.getEvent(eventId)
        .then(function (data) {
            product.event = data;
            ctx._id = data._id;

            product.sum = Number(ctx.params.countTickets) * product.event.price;
            ctx.product = product
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                product: './templates/cart/product.hbs'
            }).then(function () {
                this.partial('./templates/cart/cartView.hbs');
            });
        });

    //ADD TICKETS IN THE CART POST



//    console.log(1)
//    let eventId = ctx.params.eventId.slice(1);
//    let user = {
//        username:ctx.params.username,
//        firstName:ctx.params.firstName,
//        lastName:ctx.params.lastName,
//        email:ctx.params.email,
//        cart: {
//            eventId: eventId,
//            countTickets: ctx.params.countTickets,
//        }
//
//    };
//
//    userService.addInCart(user)
//        .then(function () {
//            ctx.redirect('#/cart');
//        })
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
                myAccountForm:'./templates/myAccount/myAccountForm.hbs'
            }).then(function () {
                ctx.partials=this.partials;
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
                myAccountEditForm:'./templates/myAccountEdit/myAccountEditForm.hbs'
            }).then(function () {
                ctx.partials=this.partials;
                ctx.partial('./templates/myAccountEdit/myAccountEditView.hbs');
            })
        })
};

handlers.myAccountEditAction = function (ctx) {
    let userId = sessionStorage.getItem('userId');

    let newUser = {
        username:ctx.params.username,
        firstName:ctx.params.firstName,
        lastName:ctx.params.lastName,
        email:ctx.params.email
    };

    userService.updateUser(userId,newUser)
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