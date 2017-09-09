handlers.home = function () {
    auth.loginStatusCheck(this);

    this.loadPartials({
        header:'./templates/common/header.hbs',
        slider:'./templates/home/slider.hbs',
        categories:'./templates/home/categories.hbs',
        locations:'./templates/home/locations.hbs',
        dates:'./templates/home/dates.hbs',
        prices:'./templates/home/prices.hbs',
        eventsNear:'./templates/home/eventsNear.hbs',
        categoryTab:'./templates/home/categoryTab.hbs',
        footerPomelo:'./templates/home/footerPomelo.hbs'
    }).then(function () {
        this.partial('./templates/home/homePage.hbs');
    })
};