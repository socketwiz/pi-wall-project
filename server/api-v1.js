
const _ = require('lodash');
const dav = require('dav');
const ical = require('ical.js');

function getCalendar(request, reply) {
    const xhr = new dav.transport.Basic(
        new dav.Credentials({
            'username': 'ricky',
            'password': 'gam4rdude'
        })
    );

    dav.createAccount({
        'filters': [{
            'type': 'comp-filter',
            'attrs': { 'name': 'VCALENDAR' },
            'children': [{
                'type': 'comp-filter',
                'attrs': { 'name': 'VEVENT' },
                'children': [{
                    'type': 'time-range',
                    'attrs': { 'start': '19970714T170000Z' }
                }]
            }]
        }],
        'server': 'https://nextcloud.socketwiz.com/remote.php/dav/',
        loadObjects: true,
        'xhr': xhr
    }).then(function getAccount(account) {
        account.calendars.forEach(function getCalendars(calendar) {
            if (calendar.displayName === 'Family') {
                dav.syncCalendar(calendar, {'xhr': xhr})
                    .then(function syncCalendar(sync) {
                        const events = [];
  
                        _.forEach(sync.objects, object => {
                            const component = new ical.Component(ical.parse(object.calendarData));
                            const vevent = component.getFirstSubcomponent('vevent');

                            const summary = vevent.getFirstPropertyValue('summary');
                            const location = vevent.getFirstPropertyValue('location');
                            const description = vevent.getFirstPropertyValue('description');
                            const dtstart = vevent.getFirstPropertyValue('dtstart');
                            const dtend = vevent.getFirstPropertyValue('dtend');

                            events.push({
                                summary,
                                location,
                                description,
                                dtstart,
                                dtend
                            });
                        });
                        reply(JSON.stringify(events));
                    })
                    .catch(function getError(error) {
                        reply(error);
                    });
            }
        });
    }).catch(function getError(error) {
        reply(error);
    });
}

module.exports = [
    {
        'method': 'GET',
        'path': '/calendar-family',
        'handler': getCalendar,
        'config': {
            'timeout': {
                'server': 60 * 1000
            }
        }
    }
];
