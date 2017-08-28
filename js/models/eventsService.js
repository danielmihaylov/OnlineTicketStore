let eventService = (() => {

    function getAllEvents() {
        return requester.get('appdata', 'ticket-store', '');
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

    return {
        getAllEvents,
        getEvent,
        updateEvent,
        deleteEvent,
        createEvent
    }
})();