handlers.venuesList = function (ctx) {
    auth.loginStatusCheck(ctx);
    let authorization = '';
    if (ctx.isUnlogged) {
        authorization = 'basic'
    }

    venueService.getVenues(authorization)
        .then(function (venues) {
            venues.sort(venueService.compareVenues);
            ctx.venues = venues;
            eventService.getAllEvents(authorization)
                .then(function (events) {
                    for (let venue of ctx.venues) {
                        venue.events=0;
                        venue.isAdmin = ctx.isAdmin;
                        for (let event of events) {
                            if(event.venue===venue._id){
                                venue.events++;
                            }
                        }
                    }

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        venue: './templates/venuesList/venue.hbs'
                    }).then(function () {
                        ctx.partials = this.partials;
                        ctx.partial('./templates/venuesList/venuesList.hbs');
                    })
                })

        })
};

