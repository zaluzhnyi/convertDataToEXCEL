const {Router} = require('express')
const xl = require('excel4node')
const router = Router()
const fs = require('fs')
const url = require('url')
const cors = require('cors')
const mainTable = require('./table.js')
router.options('/', cors())
router.post('/',cors(),async (req, res) => {
    try {
        console.log('POST запрос')
        let {planZakupok,card,table,razdely} = req.body

        let wb = new xl.Workbook()
        let ws = wb.addWorksheet('Sheet 1');
        mainTable.createTAble(ws,wb,table,card,razdely)

    let promise = new Promise((resolve,reject)=>{

        wb.write(`Заявка ${planZakupok}.xlsx`,(err,stat)=>{
            if(err) reject(err)
            else {
                console.log('Файл создан')
                    resolve();
            }
        })
    }).then(()=>{
        return
        }).catch((err)=>{
            console.log(err)
        throw new Error('файл не создан')
        }
            )
        return res.json({asd:123})
    } catch (e) {
        console.log(e, 'error')
        return  res.status(400).json({message: 'bad request'})
    }
})

router.get('/download/',async (req, res) => {
  try {
      console.log('Запрос на скачивание')

      const urlRequest = url.parse(req.url, true)
      const fileName = `Заявка ${urlRequest.query.filename}.xlsx`
      const file = __dirname+'/'+ fileName
      console.log('Путь к файлу',file)
      console.log(fs.existsSync(file))
        res.download(file,(err => {
            if(err)console.log('Ошибка: ',err)
            else{
                fs.unlink(file, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }else
                    console.log('Файл с сервера удален')
                })
            }
        }))
    } catch (e) {
        console.log(e, 'error')
        return res.status(400).json({message: 'bad request'})
    }
})

module.exports = router