const {Router} = require('express')
const xl = require('excel4node')
const router = Router()
const path = require('path');
const fs = require('fs')
const url = require('url')
const cors = require('cors')
const mainTable = require('./table.js')
const log = require('./libs/log')(__filename)

router.post('/', async (req, res) => {
    try {
        log.info('Post запрос Тендерный акт')
        let data = req.body
        let wb = new xl.Workbook()
        let ws = wb.addWorksheet('Sheet 1', {
            defaultFont: {
                size: 11,
                name: 'Times New Roman',
            }
        });
        mainTable.createTableTender(data, ws, wb)
        let fileStatus = new Promise((resolve, reject) => {
            wb.write(`file.xlsx`, (err, stat) => {
                err ? reject(err) : resolve()
            })
        })
        fileStatus.then(() => log.info('Файл создан'))
            .then(() => {
                log.info('Ответ сервера')
                return res.json({asd: 123})
            })
            .catch((err) => log.error(err, 'error'))
    } catch (e) {
        log.error(e, 'error')
        return res.status(400)
            .json({message: 'bad request'})
    }
})
module.exports = router