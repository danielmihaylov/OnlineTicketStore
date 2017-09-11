handlers.eventEdit = function (ctx) {
    auth.loginStatusCheck(ctx);

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