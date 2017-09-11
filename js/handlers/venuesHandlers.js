handlers.venuesList = function (ctx) {
    auth.loginStatusCheck(ctx);
    let authorization = '';
    if (ctx.isUnlogged) {
        authorization = 'basic'
    }

    venueService.getVenues(authorization)
        .then(function (data) {
            ctx.venues = data;
            for (let venue of ctx.venues) {
                venue.isAdmin = ctx.isAdmin;
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
};

