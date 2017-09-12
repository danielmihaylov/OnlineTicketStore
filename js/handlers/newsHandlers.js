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
                new: './templates/newsList/news.hbs'
            }).then(function () {
                ctx.partials = this.partials;
                ctx.partial('./templates/newsList/newsList.hbs');
            })
        })
        .catch(function (reason) {
            auth.handleError(reason);
        });
};

handlers.createNews = function (ctx) {
    auth.loginStatusCheck(ctx);
    this.loadPartials({
        header:'./templates/common/header.hbs',
        footer:'./templates/common/footer.hbs',
        createEventForm :'./templates/newsCreate/newsCreateForm.hbs'
    }).then(function () {
        this.partial('./templates/newsCreate/newsCreateView.hbs');
    })
};



//SHOW NEWS DETAILS

handlers.newsDetails = function (ctx) {

    let newsId = ctx.params.newsId.slice(1);
    let authentication = '';
    auth.loginStatusCheck(ctx);
    if (ctx.isUnlogged) {
        authentication = 'basic';

    }
    newsService.getNew(newsId, authentication)
        .then(function (data) {
            ctx.news = data;
            ctx._id = data._id;
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                ctx.partials = this.partials;
                ctx.partial('./templates/newsDetails/newsDetails.hbs');
            });
        });

};

//CREATE NEWS

handlers.createNewsAction = function (ctx) {
    let news = {
        title: ctx.params.title,
        summary: ctx.params.summary,
        content: ctx.params.content,
        image: ctx.params.image,
    };

    newsService.createNews(news)
        .then(function () {
            ctx.redirect('#/news');
        })
};

//EDIT NEWS

handlers.newsEdit = function (ctx) {
    auth.loginStatusCheck(ctx);

    let newsId = ctx.params.newsId.slice(1);

    newsService.getNew(newsId)
        .then(function (data) {
            ctx._id = data._id;
            ctx.title = data.title;
            ctx.summary = data.summary;
            ctx.content = data.content;
            ctx.image = data.image;

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                newsEditForm: './templates/newsEdit/newsEditForm.hbs'
            }).then(function () {
                ctx.partials = this.partials;
                ctx.partial('./templates/newsEdit/newsEditView.hbs');
            })
        })
};

handlers.newsEditAction = function (ctx) {
    let newsId = ctx.params.newsId.slice(1);
    let editedNews = {
        title: ctx.params.title,
        summary: ctx.params.summary,
        content: ctx.params.content,
        image: ctx.params.image,
    };
    newsService.updateNews(newsId, editedNews)
        .then(function () {
            ctx.redirect('#/news');
        })
};

//DELETE NEWS
handlers.newsDeleteAction = function (ctx) {
    let newsId = ctx.params.newsId.slice(1);

    newsService.deleteNews(newsId)
        .then(function () {
            ctx.redirect('#/home');
        }).catch(auth.handleError);
};
