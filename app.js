const express = require('express');

const app = express();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.referer);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json({extended: true}))
app.use('/api/parser', require('./parser'))

const PORT = process.env.PORT ||  5001

async function start() {
    try {
        app.listen(PORT, () => {
            console.log(`app has been started on port ${PORT}...`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()