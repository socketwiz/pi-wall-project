
const fs = require('fs');
const os = require('os');
const sqlite3 = require('sqlite3').verbose();
const winston = require('winston');

const log = new (winston.Logger)({
    'transports': [
        new (winston.transports.Console)(),
        new (winston.transports.File)({'filename': 'error.log'})
    ]
});

/**
 * Open an sqlite3 database connection
 *
 * @returns {Object} - sqlite3 database handle
 */
module.exports.openDb = function openDb() {
    const directory = `${os.homedir()}/.drum-practice`;
    const path = `${directory}/drum-practice.sqlite3`;

    // create directory for the database if not exist
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }

    return new sqlite3.Database(path, sqlite3.OPEN_READWRITE, error => {
        if (error) {
            log.error(error.message);
        }
    });
};

/**
 * Close an sqlite3 database connection
 */
module.exports.closeDb = function closeDb(db) {
    db.close(error => {
        if (error) {
            log.error(error.message);
        }
    });
};

/**
 * Prints the SQL queries to the logger
 */
module.exports.debugDb = function debugDb(db) {
    db.on('trace', function traceDb(query) {
        log.info(query);
    });
};

module.exports.log = log;
