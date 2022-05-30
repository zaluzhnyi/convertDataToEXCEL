const express = require('express');
const cors = require('cors')


const app = express();

app.all('*', function (req, res, next) {
    // Устанавливаем заголовок запроса, чтобы разрешить междоменный
    res.header('Access-Control-Allow-Origin', '*');
    // Устанавливаем все поля заголовка, поддерживаемые сервером
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken');
    // Устанавливаем методы для всех междоменных запросов, поддерживаемых сервером
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method.toLowerCase() == 'options') {
        res.send(200);  // Позволяем опциям запрашивать быстрое завершение
    } else {
        next();
    }
});
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
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