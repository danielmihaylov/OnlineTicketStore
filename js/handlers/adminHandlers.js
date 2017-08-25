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
            ctx.redirect('#/home');
        })
};