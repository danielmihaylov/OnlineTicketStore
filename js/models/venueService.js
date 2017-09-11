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

    function getVenue(venueId) {
        return requester.get('appdata', `venues/${venueId}`, '');
    }

    function updateVenue(venueId, venueData) {
        return requester.update('appdata',`venues/${venueId}`,'',venueData);
    }

    function deleteVenue(venueId) {
        return requester.remove('appdata',`venues/${venueId}`, '');
    }

    return {
        getVenues,
        createVenue,
        getVenue,
        updateVenue,
        deleteVenue
    }
})();