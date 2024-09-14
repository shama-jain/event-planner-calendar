// Initialize Calendar
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: loadEventsFromStorage()
    });
    calendar.render();
});

// Load events from Local Storage
function loadEventsFromStorage() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    return events.map(event => ({
        title: event.title,
        start: event.date
    }));
}

// Add Event to Calendar and Local Storage
const eventForm = document.getElementById('eventForm');
eventForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const eventTitle = document.getElementById('eventTitle').value;
    const eventDate = document.getElementById('eventDate').value;

    if (eventTitle && eventDate) {
        // Save event to Local Storage
        saveEvent(eventTitle, eventDate);
        
        // Display events
        displayEvents();
    }
    
    // Reset form
    eventForm.reset();
});

// Save event to Local Storage
function saveEvent(title, date) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.push({ title, date });
    localStorage.setItem('events', JSON.stringify(events));
}

// Display events in list
function displayEvents() {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = ''; // Clear list

    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.forEach(event => {
        const li = document.createElement('li');
        li.textContent = `${event.title} - ${new Date(event.date).toLocaleString()}`;
        eventList.appendChild(li);
    });
}

// Initial display of events
document.addEventListener('DOMContentLoaded', displayEvents);
