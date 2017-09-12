//SHOW NEWS

handlers.newsList = function (ctx) {
    auth.loginStatusCheck(ctx);
    let authentication = '';
    if (ctx.isUnlogged) {
        authentication = 'basic';
    }
    newsService.getNews(authentication)
        .then(function (data) {
            ctx.news = data;

            if(ctx.isAdmin) {
                for (let obj of ctx.news) {
                    obj.isAdmin=true;
                }
            }else if(ctx.isUnlogged) {
                for (let obj of ctx.news) {
                    obj.isUnlogged=true;
                }
            }

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                new: './templates/newsList/new.hbs'
            }).then(function () {
                ctx.partials = this.partials;
                ctx.partial('./templates/newsList/newsList.hbs');
            })
        })
        .catch(function (reason) {
            auth.handleError(reason);
        });
};
