let winston = require('winston')
let path = require('path');


const logger = caller => {
    return winston.createLogger({
        transports: [
            new winston.transports.File({
                filename: 'logs/Logger.log',
                options: {mode: 0644, flags: 'a+', encoding: 'utf8'},
                maxsize: 5242880, // 5MB
                maxFiles: 5,
            })
        ],
        format: winston.format.combine(
            winston.format.label({
                label: `исполняемый файл: ` + path.basename(caller)
            }),
            winston.format.timestamp({
                format: 'MMM-DD-YYYY HH:mm:ss'
            }),
            winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
            winston.format.printf(error => `${error.level}: ${error.label}: ${[error.timestamp]}: ${error.message}`),
        )
    })
};

module.exports = logger;