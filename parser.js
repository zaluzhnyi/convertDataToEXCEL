const {Router} = require('express')
const xl = require('excel4node')
const router = Router()
const path = require('path');
const fs = require('fs')
const url = require('url')
const cors = require('cors')
const mainTable = require('./table.js')
const log = require('./libs/log')(__filename)
router.options('/', cors())
router.post('/',cors(),async (req, res) => {
    try {
        log.info('POST запрос')
        let {planZakupok,card,table,razdely} = req.body

        let wb = new xl.Workbook()
        let ws = wb.addWorksheet('Sheet 1');
        mainTable.createTAble(ws,wb,table,card,razdely)

    let promise = new Promise((resolve,reject)=>{

        wb.write(`Заявка ${planZakupok}.xlsx`,(err,stat)=>{
            if(err) reject(err)
            else {
                log.info('Файл создан')
                    resolve();
            }
        })
    }).then(()=>{
        return
        }).catch((err)=>{
            log.error(err)
        throw new Error('файл не создан')
        }
            )
        return res.json({asd:123})
    } catch (e) {
        log.error(e, 'error')
        return  res.status(400).json({message: 'bad request'})
    }
})

router.get('/download/',async (req, res) => {
  try {
      log.info('Запрос на скачивание')

      const urlRequest = url.parse(req.url, true)
      const fileName = `Заявка ${urlRequest.query.filename}.xlsx`
      const file = path.resolve(fileName)
      log.info('Путь к файлу',file)
        res.download(file,(err => {
            if(err)log.error('Ошибка: ',err)
            else{
                fs.unlink(file, (err) => {
                    if (err) {
                        log.error(err)
                        return
                    }else
                    log.info('Файл с сервера удален')
                })
            }
        }))
    } catch (e) {
        log.error(e, 'error')
        return res.status(400).json({message: 'bad request'})
    }
})

module.exports = router