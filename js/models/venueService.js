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

    function getVenue(venueId,authentication) {
        if (authentication === 'basic') {
            return requester.get('appdata',`venues/${venueId}`,'basic', 'guest');
        } else {
            return requester.get('appdata',`venues/${venueId}`,'');
        }
    }

    function updateVenue(venueId, venueData) {
        return requester.update('appdata',`venues/${venueId}`,'',venueData);
    }

    function deleteVenue(venueId) {
        return requester.remove('appdata',`venues/${venueId}`, '');
    }

    function compareVenues (a,b) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    }

    return {
        getVenues,
        createVenue,
        getVenue,
        updateVenue,
        deleteVenue,
        compareVenues
    }
})();