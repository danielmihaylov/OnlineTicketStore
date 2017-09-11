let venueService = (() => {

    function getVenues(authentication) {
        if (authentication === 'basic') {
            return requester.get('appdata', 'venues', 'basic', 'guest');
        } else {
            return requester.get('appdata', 'venues', '');
        }
    }


    function createVenue(newVenue) {
        return requester.post('appdata', 'venues', '', newVenue);
    }

    return {
        getVenues,
        createVenue
    }
})();