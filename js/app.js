const handlers = {};

$(() => {

    let loadingBox = $('#loadingBox');
    $(document).on({
        ajaxStart: function () {
            loadingBox.show();
        },
        ajaxStop: function () {
            loadingBox.fadeOut();
        }
    });

    const app = Sammy('#app', function () {
        this.use('Handlebars', 'hbs');

        //HOME

        this.get('index.html', function () {
            this.redirect('#/home');
        });

        this.get('#/home', handlers.home);

        //LOGIN

        this.get('#/login', handlers.login);
        this.post('#/login', handlers.loginAction);

        //REGISTER

        this.get('#/register', handlers.register);
        this.post('#/register', handlers.registerAction);

        //LOGOUT

        this.get('#/logout', handlers.logout);

        //display the My Account view

        this.get('#/myAccount', handlers.myAccount);

        //edit my account
        this.get('#/myAccountEdit', handlers.myAccountEdit);
        this.post('#/myAccountEdit', handlers.myAccountEditAction);

        //reset password
        this.get('#/resetPass', handlers.resetPassword);

        //CART

        this.get('#/cart', handlers.cart);

        //add selected tickets to cart
        this.post('#/addToCart/:eventId',handlers.addToCart);

        //remove event from the cart
        this.get('#/removeItem/:eventId',handlers.removeFromCart);

        //SHOW EVENTS INFO

        this.get('#/eventsList', handlers.eventsList);
        this.get('#/eventDetails/:eventId', handlers.eventDetails);

        //SEARCH EVENTS BY CATEGORY

        this.get('#/concerts', handlers.concerts);
        this.get('#/specialEvents', handlers.specialEvents);
        this.get('#/theater', handlers.theater);
        this.get('#/sportEvents', handlers.sportEvents);

        //SEARCH EVENTS BY COUNTRY

        this.get('#/bulgaria', handlers.eventsOfBulgaria);
        this.get('#/uk', handlers.eventsOfUK);
        this.get('#/germany', handlers.eventsOfGermany);
        this.get('#/russia', handlers.eventsOfRussia);
        this.get('#/spain', handlers.eventsOfSpain);
        this.get('#/china', handlers.eventsOfChina);
        this.get('#/usa', handlers.eventsOfUSA);

        //SEARCH EVENTS BY DATE

        this.get('#/september2017', handlers.eventsOfSeptember17);
        this.get('#/october2017', handlers.eventsOfOctober17);
        this.get('#/november2017', handlers.eventsOfNovember17);
        this.get('#/december2017', handlers.eventsOfDecember17);
        this.get('#/january2018', handlers.eventsOfJanuary18);
        this.get('#/february2018', handlers.eventsOfFebruary18);
        this.get('#/march2018', handlers.eventsOfMarch18);
        this.get('#/april2018', handlers.eventsOfApril18);
        this.get('#/may2018', handlers.eventsOfMay18);
        this.get('#/jun2018', handlers.eventsOfJun18);
        this.get('#/july2018', handlers.eventsOfJuly18);
        this.get('#/august2018', handlers.eventsOfAugust18);
        this.get('#/september2018', handlers.eventsOfSeptember18);
        this.get('#/october2018', handlers.eventsOfOctober18);
        this.get('#/november2018', handlers.eventsOfNovember18);
        this.get('#/december2018', handlers.eventsOfDecember18);

        //SEARCH EVENTS BY PRICE

        this.get('#/symbolicPrices', handlers.eventsAtSymbolicPrices);
        this.get('#/lowPrices', handlers.eventsAtLowPrices);
        this.get('#/normalPrices', handlers.eventsAtNormalPrices);
        this.get('#/highPrices', handlers.eventsAtHighPrices);
        this.get('#/luxuryPrices', handlers.eventsAtLuxuryPrices);

        //EDIT EVENT

        this.get('#/edit/:eventId', handlers.eventEdit);
        this.post('#/edit/:eventId', handlers.eventEditAction);

        //deleteEvent by Daniel
        this.get('#/delete/:eventId', handlers.eventDeleteAction);

        //CREATE EVENT

        this.get('#/create', handlers.createEvent);
        this.post('#/createAction', handlers.createEventAction);

        //call venue list
        this.get('#/venuesList', handlers.venuesList);

        //create venue
        this.get('#/createVenue', handlers.createEvent);
        this.post('#/createVenue', handlers.createVenueAction);

        //edit venue
        this.get('#/editVenue/:venueId', handlers.editVenue);
        this.post('#/editVenue/:venueId', handlers.editVenueAction);

        //delete venue
        this.get('#/deleteVenue/:venueId', handlers.deleteVenue);

        //show events for the selected venue
        this.get('#/venueEvents/:venueId',handlers.eventsForVenue);

        //CALL NEWS LIST
        this.get('#/news', handlers.newsList);

        //SHOW NEWS DETAILS
        this.get('#/newsDetails/:newsId', handlers.newsDetails);

        //CREATE NEWS
        this.get('#/createNews', handlers.createNews);
        this.post('#/createNewsAction', handlers.createNewsAction);

        //EDIT NEWS

        this.get('#/editNews/:newsId', handlers.newsEdit);
        this.post('#/editNewsAction/:newsId', handlers.newsEditAction);

        //DELETE NEWS
        this.get('#/deleteNews/:newsId', handlers.newsDeleteAction);
    });

    app.run();


});