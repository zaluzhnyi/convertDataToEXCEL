const {Router} = require('express')
const xl = require('excel4node')
const router = Router()
const path = require('path');
const fs = require('fs')
const url = require('url')
const cors = require('cors')
const mainTable = require('./table.js')
const log = require('./libs/log')(__filename)
// router.options('/', cors())
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
        let promise = new Promise((resolve, reject) => {
            console.log(`${data.name.nameZayavka}.xlsx`)
            wb.write(`${data.name.nameZayavka}.xlsx`, (err, stat) => {
                if (err) reject(err)
                else {
                    log.info('Файл создан')
                    resolve();
                }
            })
        }).then(() => {
            return
        })
            .catch((err) => {
                    log.error(err)
                    throw new Error('файл не создан')
                }
            )
        return res.json({asd: 123})
    } catch (e) {
        log.error(e, 'error')
        return res.status(400)
            .json({message: 'bad request'})
    }
})
module.exports = router