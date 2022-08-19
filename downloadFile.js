const {Router} = require('express')
const router = Router()
const path = require('path');
const fs = require('fs')
const url = require('url')
const cors = require('cors')
const log = require('./libs/log')(__filename)

router.get('/', async (req, res) => {
    const urlRequest = url.parse(req.url, true)
    const fileName = `${urlRequest.query.filename}.xlsx`
    const file = path.resolve(fileName)
    try {
        log.info('Запрос на скачивание')
        log.info(file)
        log.info(`Путь к файлу ${file}`)

        let stat = fs.statSync(file)
        log.info(`Наличие и размер файла ${stat.isFile()} ${stat.size}`)
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Length': stat.size
        })
        let data = fs.readFileSync(file);
        log.info('Файл скачан')
        res.status(200)
            .send(data);
        fs.unlinkSync(file)
    } catch (e) {
        log.error(e, 'error')
        fs.unlinkSync(file)
        return res.status(400)
            .json({message: 'bad request'})
    }
})
module.exports = router