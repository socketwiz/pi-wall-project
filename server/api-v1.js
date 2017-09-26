
function postSchedule(request, reply) {
}

module.exports = [
    {
        'method': 'POST',
        'path': '/schedule',
        'config': {
            'payload': {
                'output': 'stream',
                'parse': true
            },
            'handler': postSchedule
        }
    }
];
