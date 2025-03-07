const path = require('path');
const winston = require('winston');

winston.addColors({
    info: 'green',
    warn: 'yellow',
    error: 'red',
});

const formatLog = winston.format.combine(
    winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp }) => {
        return `\n${level}: ${message} | timestamp: ${timestamp}`;
    })
);

const logger = winston.createLogger({
    level: 'info',
    format: formatLog,
    transports: [   
        new winston.transports.File({
            filename: path.resolve(__dirname, '../docs/error.log'),
            level: 'error',
            format: formatLog,
        }),

        new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            formatLog
            ),
        }),
    ],
});

module.exports = logger;