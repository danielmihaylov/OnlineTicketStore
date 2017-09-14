//SHOW EVENTS

handlers.eventsList = function (ctx) {
    auth.loginStatusCheck(ctx);
    let authentication = '';
    if (ctx.isUnlogged) {
        authentication = 'basic';
    }
    eventService.getAllEvents(authentication)
        .then(function (events) {
            ctx.events = events;
            if (ctx.isAdmin) {
                for (let event of ctx.events) {
                    event.isAdmin = true;
                }
            } else if (ctx.isUnlogged) {
                for (let event of ctx.events) {
                    event.isUnlogged = true;
                }
            }
            venueService.getVenues(authentication)
                .then(function (venues) {

                    for (let event of ctx.events) {
                        if (event.tickets==="0") event.noTickets=true;
                        event.venueName = venues.filter(v => v._id === event.venue)[0].name;
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
        })
        .catch(function (reason) {
            auth.handleError(reason);
        });
};

//SHOW EVENTS DETAILS

handlers.eventDetails = function (ctx) {

    let eventId = ctx.params.eventId.slice(1);
    let authentication = '';
    auth.loginStatusCheck(ctx);
    if (ctx.isUnlogged) {
        authentication = 'basic';
    }
    eventService.getEvent(eventId, authentication)
        .then(function (data) {
            venueService.getVenue(data.venue, authentication)
                .then(function (venue) {
                    ctx.venueName = venue.name;
                    ctx.event = data;
                    ctx._id = data._id;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                    }).then(function () {
                        ctx.partials = this.partials;
                        ctx.partial('./templates/eventDetails/eventDetails.hbs');
                    });
                })
        });

};

//SHOW EVENTS BY CATEGORY

handlers.concerts = function (ctx) {
    let category = 'Concert';
    handlers.eventsListByCategory(ctx, category);
};

handlers.specialEvents = function (ctx) {
    let category = 'Special Event';
    handlers.eventsListByCategory(ctx, category);
};

handlers.theater = function (ctx) {
    let category = 'Theater';
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
            ctx.thereIsEventsInCategory = false;
            for (let obj of ctx.events) {
                if (obj.category === searchedCategory) {
                    obj.isInCategory = true;
                    ctx.thereIsEventsInCategory = true;
                } else {
                    obj.isInCategory = false;
                }

            }

            if (ctx.isAdmin) {
                for (let obj of ctx.events) {
                    obj.isAdmin = true;
                }
            } else if (ctx.isUnlogged) {
                for (let obj of ctx.events) {
                    obj.isUnlogged = true;
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

//SHOW EVENTS BY COUNTRY

handlers.eventsOfBulgaria = function (ctx) {
    let country = 'Bulgaria';
    handlers.eventListByCountry(ctx, country);
};

handlers.eventsOfGermany = function (ctx) {
    let country = 'Germany';
    handlers.eventListByCountry(ctx, country);
};

handlers.eventsOfUK = function (ctx) {
    let country = 'UK';
    handlers.eventListByCountry(ctx, country);
};

handlers.eventsOfRussia = function (ctx) {
    let country = 'Russia';
    handlers.eventListByCountry(ctx, country);
};

handlers.eventsOfSpain = function (ctx) {
    let country = 'Spain';
    handlers.eventListByCountry(ctx, country);
};

handlers.eventsOfChina = function (ctx) {
    let country = 'China';
    handlers.eventListByCountry(ctx, country);
};

handlers.eventsOfUSA = function (ctx) {
    let country = 'USA';
    handlers.eventListByCountry(ctx, country);
};

handlers.eventListByCountry = function (ctx, searchedCountry) {
    auth.loginStatusCheck(ctx);
    let authentication = '';
    if (ctx.isUnlogged) {
        authentication = 'basic';
    }
    eventService.getAllEvents(authentication)
        .then(function (data) {
            ctx.events = data;
            ctx.thereIsEventsOfTheSameCountry = false;
            for (let obj of ctx.events) {
                if (obj.country === searchedCountry) {
                    obj.inSameCountry = true;
                    ctx.thereIsEventsOfTheSameCoutry = true;
                } else {
                    obj.inSameCountry = false;
                }

            }

            if (ctx.isAdmin) {
                for (let obj of ctx.events) {
                    obj.isAdmin = true;
                }
            } else if (ctx.isUnlogged) {
                for (let obj of ctx.events) {
                    obj.isUnlogged = true;
                }
            }

            ctx.country = searchedCountry;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                event: './templates/eventsList/eventByCountry.hbs'
            }).then(function () {
                ctx.partials = this.partials;
                ctx.partial('./templates/eventsList/eventListByCountry.hbs');
            })
        })
        .catch(function (reason) {
            auth.handleError(reason);
        });
};

//SHOW EVENTS BY DATE

handlers.eventsOfSeptember17 = function (ctx) {
    let month = ['09', '2017'];
    handlers.eventListByDate(ctx, month);
};

handlers.eventsOfOctober17 = function (ctx) {
    let month = ['10', '2017'];
    handlers.eventListByDate(ctx, month);
};

handlers.eventsOfNovember17 = function (ctx) {
    let month = ['11', '2017'];
    handlers.eventListByDate(ctx, month);
};

handlers.eventsOfDecember17 = function (ctx) {
    let month = ['12', '2017'];
    handlers.eventListByDate(ctx, month);
};

handlers.eventsOfJanuary18 = function (ctx) {
    let month = ['01', '2018'];
    handlers.eventListByDate(ctx, month);
};

handlers.eventsOfFebruary18 = function (ctx) {
    let month = ['02', '2018'];
    handlers.eventListByDate(ctx, month);
};

handlers.eventsOfMarch18 = function (ctx) {
    let month = ['03', '2018'];
    handlers.eventListByDate(ctx, month);
};

handlers.eventsOfApril18 = function (ctx) {
    let month = ['04', '2018'];
    handlers.eventListByDate(ctx, month);
};

handlers.eventsOfMay18 = function (ctx) {
    let month = ['05', '2018'];
    handlers.eventListByDate(ctx, month);
};

handlers.eventsOfJun18 = function (ctx) {
    let month = ['06', '2018'];
    handlers.eventListByDate(ctx, month);
};

handlers.eventsOfJuly18 = function (ctx) {
    let month = ['07', '2018'];
    handlers.eventListByDate(ctx, month);
};

handlers.eventsOfAugust18 = function (ctx) {
    let month = ['08', '2018'];
    handlers.eventListByDate(ctx, month);
};

handlers.eventsOfSeptember18 = function (ctx) {
    let month = ['09', '2018'];
    handlers.eventListByDate(ctx, month);
};

handlers.eventsOfOctober18 = function (ctx) {
    let month = ['10', '2018'];
    handlers.eventListByDate(ctx, month);
};

handlers.eventsOfNovember18 = function (ctx) {
    let month = ['11', '2018'];
    handlers.eventListByDate(ctx, month);
};

handlers.eventsOfDecember18 = function (ctx) {
    let month = ['12', '2018'];
    handlers.eventListByDate(ctx, month);
};

handlers.eventListByDate = function (ctx, searchedDate) {
    auth.loginStatusCheck(ctx);
    let authentication = '';
    if (ctx.isUnlogged) {
        authentication = 'basic';
    }
    eventService.getAllEvents(authentication)
        .then(function (data) {
            ctx.events = data;
            ctx.thereIsEventsOfTheSameDate = false;
            for (let obj of ctx.events) {
                let objArr = obj.date.split('-');
                let year = objArr[0];
                let month = objArr[1];

                if (month === searchedDate[0] && year === searchedDate[1]) {
                    obj.inSameMonth = true;
                    ctx.thereIsEventsOfTheSameMonth = true;
                } else {
                    obj.inSameMonth = false;
                }

            }

            if (ctx.isAdmin) {
                for (let obj of ctx.events) {
                    obj.isAdmin = true;
                }
            } else if (ctx.isUnlogged) {
                for (let obj of ctx.events) {
                    obj.isUnlogged = true;
                }
            }

            ctx.month = searchedDate[0] + '.' + searchedDate[1];

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                event: './templates/eventsList/eventByDate.hbs'
            }).then(function () {
                ctx.partials = this.partials;
                ctx.partial('./templates/eventsList/eventListByDate.hbs');
            })
        })
        .catch(function (reason) {
            auth.handleError(reason);
        });
};

//SHOW EVENTS BY PRICE

handlers.eventsAtSymbolicPrices = function (ctx) {
    let searchedPrice = [0, 1];
    handlers.eventListByPrice(ctx, searchedPrice);
};

handlers.eventsAtLowPrices = function (ctx) {
    let searchedPrice = [2, 99];
    handlers.eventListByPrice(ctx, searchedPrice);
};

handlers.eventsAtNormalPrices = function (ctx) {
    let searchedPrice = [100, 999];
    handlers.eventListByPrice(ctx, searchedPrice);
};

handlers.eventsAtHighPrices = function (ctx) {
    let searchedPrice = [1000, 9999];
    handlers.eventListByPrice(ctx, searchedPrice);
};

handlers.eventsAtLuxuryPrices = function (ctx) {
    let searchedPrice = [10000, 100000];
    handlers.eventListByPrice(ctx, searchedPrice);
};


handlers.eventListByPrice = function (ctx, searchedPrice) {

    auth.loginStatusCheck(ctx);
    let authentication = '';
    if (ctx.isUnlogged) {
        authentication = 'basic';
    }
    eventService.getAllEvents(authentication)
        .then(function (data) {
            ctx.events = data;
            ctx.thereIsEventsOfTheSamePrice = false;
            for (let obj of ctx.events) {
                let price = Number(obj.price);
                if (price !== 0) {
                    switch (obj.currency) {
                        case "£ (GB pound)":
                            price *= 2.15;
                            break;
                        case "Ƀ (Bitcoin)":
                            price *= 6889.58;
                            break;
                        case "$ (US dollar)":
                            price *= 1.63;
                            break;
                        case "€ (Euro)":
                            price *= 1.96;
                            break;
                    }
                }


                if (price < searchedPrice[1] && price >= searchedPrice[0]) {
                    obj.inSamePrice = true;
                    ctx.thereIsEventsOfTheSamePrice = true;
                } else {
                    obj.inSamePrice = false;
                }

            }

            if (ctx.isAdmin) {
                for (let obj of ctx.events) {
                    obj.isAdmin = true;
                }
            } else if (ctx.isUnlogged) {
                for (let obj of ctx.events) {
                    obj.isUnlogged = true;
                }
            }

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                event: './templates/eventsList/eventByPrice.hbs'
            }).then(function () {
                ctx.partials = this.partials;
                ctx.partial('./templates/eventsList/eventListByPrice.hbs');
            })
        })
        .catch(function (reason) {
            auth.handleError(reason);
        });
};