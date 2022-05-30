const express = require('express');
const cors = require('cors')


const app = express();

let adr ='';
app.use(function (req, res, next) {
    adr = req.headers.origin
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(cors({
    origin: adr
}))



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