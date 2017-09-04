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

handlers.myAccount = function () {
    auth.loginStatusCheck(this);

    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/myAccount/myAccountView.hbs');
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

handlers.eventsList = function (ctx) {
    auth.loginStatusCheck(ctx);
    let authentication = '';
    if (ctx.isUnlogged) {
        authentication = 'basic';
    }
    eventService.getAllEvents(authentication)
        .then(function (data) {
            ctx.events = data;

            if(ctx.isAdmin) {
                for (let obj of ctx.events) {
                    obj.isAdmin=true;
                }
            }else if(ctx.isUnlogged) {
                for (let obj of ctx.events) {
                    obj.isUnlogged=true;
                }
            }

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                event: './templates/eventsList/event.hbs'
            }).then(function () {
                ctx.partials = this.partials;
                ctx.partial('./templates/eventsList/eventsList.hbs');
            })
        })
        .catch(function (reason) {
            auth.handleError(reason);
        });
};

handlers.eventDetails = function (ctx) {

    let eventId = ctx.params.eventId.slice(1);
    let authentication = '';
    auth.loginStatusCheck(ctx);
    if (ctx.isUnlogged) {
        authentication = 'basic';

    }
    eventService.getEvent(eventId, authentication)
        .then(function (data) {
            ctx.event = data;
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                ctx.partials = this.partials;
                ctx.partial('./templates/eventDetails/eventDetails.hbs');
            });
        });

};

handlers.concerts = function (ctx) {
    let category  = 'Concert';
    handlers.eventsListByCategory(ctx, category);
};

handlers.specialEvents = function (ctx) {
    let category  = 'Special Event';
    handlers.eventsListByCategory(ctx, category);
};

handlers.theater = function (ctx) {
    let category  = 'Theater';
    handlers.eventsListByCategory(ctx, category);
};

handlers.sportEvents = function (ctx) {
    let category = 'Sport Event';
    handlers.eventsListByCategory(ctx, category);
};

handlers.eventsListByCategory = function (ctx, searchedCategory) {
    auth.loginStatusCheck(ctx);
    let authentication = '';
    if (ctx.isUnlogged) {
        authentication = 'basic';
    }
    eventService.getAllEvents(authentication)
        .then(function (data) {
            ctx.events = data;
            ctx.thereIsEventsInCategory = false
            for (let obj of ctx.events) {
                if (obj.category === searchedCategory) {
                    obj.isInCategory = true;
                    ctx.thereIsEventsInCategory = true;
                }else{
                    obj.isInCategory = false;
                }

            }

            if(ctx.isAdmin) {
                for (let obj of ctx.events) {
                    obj.isAdmin=true;
                }
            }else if(ctx.isUnlogged) {
                for (let obj of ctx.events) {
                    obj.isUnlogged=true;
                }
            }

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                event: './templates/eventsList/eventByCategory.hbs'
            }).then(function () {
                ctx.partials = this.partials;
                ctx.partial('./templates/eventsList/eventListByCategory.hbs');
            })
        })
        .catch(function (reason) {
            auth.handleError(reason);
        });
};


//Not working
//
// handlers.myAccount = function (ctx) {
//     let userId = ctx.params.id.slice(1);
//
//     eventService.getUser(userId)
//         .then(function (userInfo) {
//             ctx.username = sessionStorage.getItem('username');
//             ctx.userId = userId;
//             ctx.name = userInfo.name;
//             ctx.firstName = userInfo.firstName === sessionStorage.getItem('firstName');
//             ctx.lastName = userInfo.lastName === sessionStorage.getItem('lastName');
//             ctx.email = userInfo.email === sessionStorage.getItem('email');
//             ctx.loadPartials({
//                 header: './templates/common/header.hbs',
//                 footer: './templates/common/footer.hbs',
//             }).then(function () {
//                 this.partial('./templates/myAccount/myAccountView.hbs');
//             })
//         })
// };