const {Router} = require('express')
const router = Router()
const path = require('path');
const fs = require('fs')
const url = require('url')
const cors = require('cors')
const log = require('./libs/log')(__filename)
router.get('/', async (req, res) => {
    try {
        log.info('Запрос на скачивание')

        const urlRequest = url.parse(req.url, true)
        const fileName = `${urlRequest.query.filename}.xlsx`
        const file = path.resolve(fileName)
        log.info('Путь к файлу', file)
        res.download(file, (err => {
            if (err) log.error('Ошибка: ', err)
            else {
                fs.unlink(file, (err) => {
                    if (err) {
                        log.error(err)
                        return
                    } else
                        log.info('Файл с сервера удален')
                })
            }
        }))
    } catch (e) {
        log.error(e, 'error')
        return res.status(400)
            .json({message: 'bad request'})
    }
})
module.exports = router