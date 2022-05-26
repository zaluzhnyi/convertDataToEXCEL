const {Router} = require('express')
const xl = require('excel4node')
const router = Router()
const fs = require('fs')
const url = require('url')


router.post('/', async (req, res) => {
    try {
        console.log('POST запрос')
        let {table, planZakupok, iniciator, urFace, data, period} = req.body
        let arrayNameColumn = ['Объект', 'Подразделение', '№ План Закупок(Заявки)', 'Период', 'Содержание', 'ФИО Инициатора', 'ФИО Исполнителя', 'Дата создания', 'Дата получения в работу', 'Сумма заявки', 'Исполнитель(специалист отдела)', 'Статус заявки(оформляется в ручную)', 'Получена товаров(сумма)', 'Оплачено(сумма)']
        let arrayNameColumn2 = ['razdely_plana', 'ispolnitel', 'cena']

        let wb = new xl.Workbook()
        let ws = wb.addWorksheet('Sheet 1');

        arrayNameColumn.forEach((el, index) => {
            ws.cell(1, index + 1).string(el)
        })
        table.forEach((el, index) => {
            ws.cell(index + 2, 1).string(urFace)
            ws.cell(index + 2, 2).string(el[arrayNameColumn2[0]])
            ws.cell(index + 2, 3).string(planZakupok)
            ws.cell(index + 2, 4).string(period)
            ws.cell(index + 2, 5).string('Содержание')
            ws.cell(index + 2, 6).string(iniciator)
            ws.cell(index + 2, 7).string(el[arrayNameColumn2[1]])
            ws.cell(index + 2, 8).string(data)
            ws.cell(index + 2, 9).string('Дата получения в работу')
            ws.cell(index + 2, 10).string(el[arrayNameColumn2[2]])
            ws.cell(index + 2, 11).string('Исполнитель')
            ws.cell(index + 2, 12).string('Статус заявки')
            ws.cell(index + 2, 13).string('Получено товаров')
            ws.cell(index + 2, 14).string('Оплачено')

        })
    let promise = new Promise((resolve,reject)=>{

        wb.write(`Заявка ${planZakupok}.xlsx`,(err,stat)=>{
            if(err) reject(err)
            else {
                console.log('Файл создан')
                setTimeout(() => {
                    resolve();
                }, 100)
            }
        })
    }).then(()=>{
            res.ok
        })
    } catch (e) {
        console.log(e, 'error')
        res.status(400).json({message: 'bad request'})
    }
})

router.get('/download/', async (req, res) => {
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