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
app.use('/api/parser', require('./parser'))

const PORT = process.env.PORT ||  5001
const PORT2 = process.env.PORT ||  5002

async function start() {
    try {
        const httpsServer = https.createServer(
            {
                key: fs.readFileSync('./keys/privkey.pem'),
                cert: fs.readFileSync('./keys/cert.pem'),
            },
            app

        )

        app.listen(PORT, () => {
            log.info(`app has been started on port ${PORT}...`)
        })
        httpsServer.listen(PORT2,()=>{
            log.info(`https has been started on port ${PORT2}...`)
        })
    } catch (e) {
        log.error(e)
    }
}

start()