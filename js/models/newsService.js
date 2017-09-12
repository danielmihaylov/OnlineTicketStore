let newsService = (() => {

    function getNews(authentication) {
        if (authentication === 'basic') {
            return requester.get('appdata', 'news', 'basic', 'guest');
        } else {
            return requester.get('appdata', 'news', '');
        }

    }

    function getNew(eventId, authentication) {
        if (authentication === 'basic') {

            return requester.get('appdata', `news/${eventId}`, 'basic', 'guest');
        } else {
            return requester.get('appdata', `news/${eventId}`, '');
        }
    }

    return {
        getNews,
        getNew
    }
})();
