const express = require('express');
const cors = require('cors')


const app = express();


// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', req.);
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// });
// const corsOptions ={
//     origin:'*',
//     credentials:true,
//     optionSuccessStatus:200,
// }
const whitelist = ["https://zzasvt3w2mcik.elma365.eu/"]
const corsOptions = {
    origin: function (origin, callback) {
        console.log(origin)
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))





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