handlers.eventEdit = function (ctx) {
    auth.loginStatusCheck(ctx);
    if (!ctx.isAdmin) {
        messenger.showError('Unauthorized');
        ctx.redirect('#/home');
    } else {
        let eventId = ctx.params.eventId.slice(1);
        eventService.getEvent(eventId)
            .then(function (data) {
                ctx._id = data._id;
                ctx.star = data.star;
                ctx.name = data.name;
                ctx.category = data.category;
                ctx.date = data.date;
                ctx.location = data.location;
                ctx.country = data.country;
                ctx.price = data.price;
                ctx.currency = data.currency;
                ctx.tickets = data.tickets;
                ctx.description = data.description;
                ctx.image = data.image;

                let eventId = ctx.params.eventId.slice(1);

                eventService.getEvent(eventId)
                    .then(function (data) {
                        ctx._id = data._id;
                        ctx.star = data.star;
                        ctx.name = data.name;
                        ctx.category = data.category;
                        ctx.date = data.date;
                        ctx.location = data.location;
                        ctx.country = data.country;
                        ctx.price = data.price;
                        ctx.currency = data.currency;
                        ctx.tickets = data.tickets;
                        ctx.description = data.description;
                        ctx.image = data.image;

                        ctx.loadPartials({
                            header: './templates/common/header.hbs',
                            footer: './templates/common/footer.hbs',
                            eventEditForm: './templates/eventsEdit/newsEditForm.hbs'
                        }).then(function () {
                            ctx.partials = this.partials;
                            ctx.partial('./templates/eventsEdit/newsEditView.hbs');
                        })
                    })
            });
    }
};

handlers.eventEditAction = function (ctx) {
    let eventId = ctx.params.eventId.slice(1);
    let editedEvent = {
        star: ctx.params.star,
        name: ctx.params.name,
        category: ctx.params.category,
        date: ctx.params.date,
        location: ctx.params.location,
        country: ctx.params.country,
        price: ctx.params.price,
        currency: ctx.params.currency,
        tickets: ctx.params.tickets,
        description: ctx.params.description,
        image: ctx.params.image
    };
    if (Number(editedEvent.tickets) > 0) {
        editedEvent.availabality = true;
    } else {
        editedEvent.availabality = false;
    }
    eventService.updateEvent(eventId, editedEvent)
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
        }).catch(auth.handleError);
};

//call create event page
handlers.createEvent = function (ctx) {
    auth.loginStatusCheck(ctx);
    this.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        createEventForm: './templates/eventsCreate/newsCreateForm.hbs'
    }).then(function () {
        this.partial('./templates/eventsCreate/newsCreateView.hbs');
    })
};

//Create the event - post data from the create event page to Kinvey
handlers.createEventAction = function (ctx) {
    let newEvent = {
        star: ctx.params.star,
        name: ctx.params.name,
        category: ctx.params.category,
        date: ctx.params.date,
        country: ctx.params.country,
        location: ctx.params.location,
        price: ctx.params.price,
        currency: ctx.params.currency,
        tickets: ctx.params.tickets,
        description: ctx.params.description,
        image: ctx.params.image
    };

    if (Number(newEvent.tickets) > 0) {
        newEvent.availabality = true;
    } else {
        newEvent.availabality = false;
    }

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

//Call edit venue page and fill in the form with the existing data
handlers.editVenue = function (ctx) {
    auth.loginStatusCheck(ctx);
    if (!ctx.isAdmin) {
        messenger.showError('Unauthorized');
        ctx.redirect('#/home');
    } else {
        let venueId = ctx.params.venueId.slice(1);
        venueService.getVenue(venueId)
            .then(function (data) {
                ctx._id = data._id;
                ctx.name = data.name;
                ctx.location = data.location;
                ctx.image = data.image;
                ctx.description = data.description;

                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    editVenueForm: './templates/venueEdit/editVenueForm.hbs'
                }).then(function () {
                    ctx.partials = this.partials;
                    ctx.partial('./templates/venueEdit/editVenuePage.hbs');
                })
            })
    }
};


//Edit the venue in the backend
handlers.editVenueAction = function (ctx) {
    auth.loginStatusCheck(ctx);
    if (!ctx.isAdmin) {
        messenger.showError('Unauthorized');
        ctx.redirect('#/home');
    } else {
        let venueId = ctx.params.venueId.slice(1);
        console.log(venueId);
        let editedVenue = {
            location: ctx.params.location,
            image: ctx.params.image,
            name: ctx.params.name,
            description: ctx.params.description
        };

        venueService.updateVenue(venueId, editedVenue)
            .then(function () {
                ctx.redirect('#/venuesList');
            })
    }
};

//Delete venue
handlers.deleteVenue = function (ctx) {
    auth.loginStatusCheck(ctx);
    if (!ctx.isAdmin) {
        ctx.redirect('#/home');
    } else {
        let venueId = ctx.params.venueId.slice(1);

        venueService.deleteVenue(venueId)
            .then(function () {
                ctx.redirect('#/venuesList');
            })
    }
};

