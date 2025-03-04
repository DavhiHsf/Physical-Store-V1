const path = require('path');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
        winston.format.printf(({ level, message, timestamp }) => {
         return `\n${level}: ${message} - timestamp: ${timestamp}`;
        })
    ),
    transports: [
        new winston.transports.File({
        filename: path.resolve(__dirname, '../docs/error.log'),
        level: 'error',
    }),
        new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ level, message, timestamp }) => {
            return `\n${level}: ${message} - ${timestamp}`;
            })),
        }),
    ],
});

module.exports = logger;