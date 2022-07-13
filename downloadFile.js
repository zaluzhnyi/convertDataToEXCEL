const {Router} = require('express')
const router = Router()
const path = require('path');
const fs = require('fs')
const url = require('url')
const cors = require('cors')
const log = require('./libs/log')(__filename)

router.get('/' ,async (req, res) => {
    try {
        log.info('Запрос на скачивание')

        const urlRequest = url.parse(req.url, true)
        const fileName = `${urlRequest.query.filename}.xlsx`
        const file = path.resolve(fileName)
        log.info(file)
        log.info(`Путь к файлу ${file}` )

        let stat = fs.statSync(file)
        log.info(`Наличие и размер файла ${stat.isFile()} ${stat.size}`)
        res.set({
            'Content-Type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Length': stat.size
        })
        // let readStream = fs.createReadStream(file)
        let data = fs.readFileSync(file);
        // // readStream.read()
        // // readStream.pipe(res)
        log.info('Файл скачан')
        // // readStream.close()
        // return res.status(200).send(data);
        res.status(200).send(data);
    } catch (e) {
        log.error(e, 'error')
        return res.status(400)
            .json({message: 'bad request'})
    }
})
module.exports = router