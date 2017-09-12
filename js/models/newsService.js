let newsService = (() => {

    function getNews(authentication) {
        if (authentication === 'basic') {
            return requester.get('appdata', 'news', 'basic', 'guest');
        } else {
            return requester.get('appdata', 'news', '');
        }

    }

    function getNew(newsId, authentication) {
        if (authentication === 'basic') {
            return requester.get('appdata', `news/${newsId}`, 'basic', 'guest');
        } else {
            return requester.get('appdata', `news/${newsId}`, '');
        }
    }

    function createNews(news) {
        return requester.post('appdata','news','',news);
    }

    function updateNews(newsId, newsData) {
        return requester.update('appdata',`news/${newsId}`,'',newsData);
    }

    function deleteNews(newsId) {
        return requester.remove('appdata',`news/${newsId}`, 'kinvey');
    }

    return {
        getNews,
        getNew,
        createNews,
        updateNews,
        deleteNews
    }
})();
