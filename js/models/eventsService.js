let eventService = (() => {

    function getAllEvents(authentication) {
        if (authentication === 'basic') {
            return requester.get('appdata', 'ticket-store', 'basic', 'guest');
        } else {
            return requester.get('appdata', 'ticket-store', '');
        }

    }

    function getEvent(eventId) {
        return requester.get('appdata',`ticket-store/${eventId}`,'')
    }

    function updateEvent(eventId, eventData) {
        return requester.update('appdata',`ticket-store/${eventId}`,'',eventData);
    }

    //deleteEvent by Daniel
    function deleteEvent() {
        return requester.remove('appdata',`ticket-store/${eventId}`, 'kinvey');
    }

    function createEvent(newEvent) {
        return requester.post('appdata','ticket-store','',newEvent);
    }

    //Not Working
    // function getUser(userId) {
    //     return requester.get('appdata', `users/${userId}`, 'kinvey');
    // }

    return {
        getAllEvents,
        getEvent,
        updateEvent,
        deleteEvent,
        createEvent,
        //getUser
    }
})();