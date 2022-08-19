const express = require('express');
const cors = require('cors')
const https = require('https');
const fs = require('fs');
const log = require('./libs/log')(__filename)


const app = express();


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json({extended: true}))
app.use('/api/parserTender', require('./parserTender'))
app.use('/api/parserPlanZak', require('./parserPlanZak'))
app.use('/api/download', require('./downloadFile'))


const PORT = process.env.PORT || 5001
const PORT2 = process.env.PORT || 5002

async function start() {
    try {


        app.listen(PORT, () => {
            log.info(`app has been started on port ${PORT}...`)
        })

    } catch (e) {
        log.error(e)
    }
}

start()