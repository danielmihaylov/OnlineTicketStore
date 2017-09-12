let eventService = (() => {

    function getAllEvents(authentication) {
        if (authentication === 'basic') {
            return requester.get('appdata', 'ticket-store', 'basic', 'guest');
        } else {
            return requester.get('appdata', 'ticket-store', '');
        }

    }

    function getEvent(eventId, authentication) {
        if (authentication === 'basic') {

            return requester.get('appdata',`ticket-store/${eventId}`,'basic', 'guest');
        } else {
            return requester.get('appdata',`ticket-store/${eventId}`,'');
        }
    }

    function updateEvent(eventId, eventData) {
        return requester.update('appdata',`ticket-store/${eventId}`,'',eventData);
    }

    //deleteEvent by Daniel
    function deleteEvent(eventId) {
        return requester.remove('appdata',`ticket-store/${eventId}`, 'kinvey');
    }

    function createEvent(newEvent) {
        return requester.post('appdata','ticket-store','',newEvent);
    }

    return {
        getAllEvents,
        getEvent,
        updateEvent,
        deleteEvent,
        createEvent
    }

})();