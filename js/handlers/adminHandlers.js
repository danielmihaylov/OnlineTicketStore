handlers.eventEdit = function (ctx) {
    auth.loginStatusCheck(ctx);

    let eventId = ctx.params.eventId.slice(1);

    eventService.getEvent(eventId)
        .then(function (data) {
            ctx._id = data._id;
            ctx.star = data.star;
            ctx.category = data.category;
            ctx.date = data.date;
            ctx.location = data.location;
            ctx.price = data.price;
            ctx.currency = data.currency;
            ctx.tickets = data.tickets;
            ctx.description = data.description;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                eventEditForm: './templates/eventsEdit/eventEditForm.hbs'
            }).then(function () {
                ctx.partials = this.partials;
                ctx.partial('./templates/eventsEdit/eventEditView.hbs');
            })
        })
};

handlers.eventEditAction = function (ctx) {
    let eventId = ctx.params.eventId.slice(1);
    let editedEvent = {
        star: ctx.params.star,
        category: ctx.params.category,
        date: ctx.params.date,
        location: ctx.params.location,
        price: ctx.params.price,
        currency: ctx.params.currency,
        tickets: ctx.params.tickets,
        description: ctx.params.description
    };

    eventService.updateEvent(eventId,editedEvent)
        .then(function () {
            ctx.redirect('#/eventsList');
        })
};

//deleteEvent by Daniel
handlers.eventDeleteAction = function (ctx) {
    let eventId = ctx.params.eventId.slice(1);

    eventService.deleteEvent(eventId)
        .then(function () {
            ctx.redirect('#/home');
        }).catch(handleError);
};

//call create event page
handlers.createEvent = function () {
    this.loadPartials({
        header:'./templates/common/header.hbs',
        footer:'./templates/common/footer.hbs',
        createEventForm :'./templates/eventsCreate/eventCreateForm.hbs'
    }).then(function () {
        this.partial('./templates/eventsCreate/eventCreateView.hbs');
    })
};

//Create the event - post data from the create event page to Kinvey
handlers.createEventAction = function (ctx) {
    let newEvent = {
        star: ctx.params.star,
        category: ctx.params.category,
        date: ctx.params.date,
        location: ctx.params.location,
        price: ctx.params.price,
        currency: ctx.params.currency,
        tickets: ctx.params.tickets,
        description: ctx.params.description
    };

    eventService.createEvent(newEvent)
        .then(function () {
            ctx.redirect('#/eventsList');
        })
};

//Create a venue - call create event page
handlers.createVenue = function () {
    auth.loginStatusCheck(this);
    if (!this.isAdmin) {
        messenger.showError('Unauthorized');
        this.redirect('#/home');
    } else {
        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            createVenueForm: './templates/venueCreate/createVenueForm.hbs'
        }).then(function () {
            this.partial('./templates/venueCreate/createVenueView.hbs');
        })
    }
};

//Execute create event action
handlers.createVenueAction = function (ctx) {
    let newVenue = {
        location: ctx.params.location,
        image: ctx.params.image,
        name: ctx.params.name,
        description: ctx.params.description
    };

    venueService.createVenue(newVenue)
        .then(function () {
            ctx.redirect('#/venuesList');
        })
};