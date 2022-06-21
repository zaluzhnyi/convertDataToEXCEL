let winston = require('winston')
 function getLogger(module) {
     let path = module.filename.split('/').slice(-2).join('/')
     return new winston.Logger({
         transports:[new (winston.transports.File)({
             filename: 'node.log'
             label: path
         })]
     })
 }
 module.exports = getLogger;