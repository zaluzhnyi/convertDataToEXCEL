const settings = require('./settings.js')
let tableNameColumn = ['№ п/п', 'Статья бюджета', 'Наименование товара /торговая марка', 'Фасовка', 'Характеристики (требование к качеству, техническим и функциональным характеристикам, к их безопасности, размерам, упаковке и иным показателям, связанных с определением соответствия поставляемого товара, потребностям заказчика, целесообразность и обоснованность приобретения товара)', 'Ед. изм.', 'Кол-во', 'Цена', 'Сумма', 'Остатки на складах','Желаемые сроки поставки']
let cardNameColumn2 = ['Дата', 'Период', 'Структурное подразделение','ФИО Инициатора, контакт, электронная почта']
let cardPropertys= ['data','period','podrazdelenie','iniciator']
let tablePropertys =['budget_item','nameProduct','fasovka','kharakteristiki','ed_izm','kolvo','cena','summa','ostatki','dataPostavki']
let row
let count
let accumSumm
function createTable(ws,wb,table,card,razdely) {
    row=1
    count =1
    accumSumm=0
    settings.setWidthColumn(ws,wb)
    ws.cell(row,1,row,11,true)
        .string('Приложение №1')
        .style({
            alignment: {
                wrapText: true,
                horizontal: 'right',
            },
            border: {
                left: {
                    style: 'thin',
                    color: 'black',
                },
                right: {
                    style: 'thin',
                    color: 'black',
                },
                top: {
                    style: 'thin',
                    color: 'black',
                },
                bottom: {
                    style: 'thin',
                    color: 'black',
                },
                outline: false,
            },
        })
    ws.cell(++row,1,row,11,true)
        .string(card['urFace'])
        .style({
            font: {
                bold: true,
            },
            alignment: {
                wrapText: true,
                horizontal: 'center',
            },
            border: {
                left: {
                    style: 'thin',
                    color: 'black',
                },
                right: {
                    style: 'thin',
                    color: 'black',
                },
                top: {
                    style: 'thin',
                    color: 'black',
                },
                bottom: {
                    style: 'thin',
                    color: 'black',
                },
                outline: false,
            },
        })
    ws.cell(++row,1,row,11,true)
        .string(card['name'])
        .style({
            font: {
                bold: true,
            },
            alignment: {
                wrapText: true,
                horizontal: 'center',
            },
            border: {
                left: {
                    style: 'thin',
                    color: 'black',
                },
                right: {
                    style: 'thin',
                    color: 'black',
                },
                top: {
                    style: 'thin',
                    color: 'black',
                },
                bottom: {
                    style: 'thin',
                    color: 'black',
                },
                outline: false,
            },
        })

    cardNameColumn2.forEach((el,index)=>{

        ws.cell(++row,1,row,2,true)
            .string(el)
            .style({
                font: {
                    bold: true,
                },
                alignment: {
                    wrapText: true,
                    horizontal: 'left',
                },
                fill:{
                    type: 'pattern',
                    patternType: 'solid',
                    fgColor:'d0cece'
                },
                border: {
                    left: {
                        style: 'thin',
                        color: 'black',
                    },
                    right: {
                        style: 'thin',
                        color: 'black',
                    },
                    top: {
                        style: 'thin',
                        color: 'black',
                    },
                    bottom: {
                        style: 'thin',
                        color: 'black',
                    },
                    outline: false,
                },
            })
        ws.cell(row,3,row,11,true)
            .string(card[cardPropertys[index]])
            .style({
                font: {
                    bold: true,
                },
                alignment: {
                    wrapText: true,
                    horizontal: 'center',
                },
                fill:{
                    type: 'pattern',
                    patternType: 'solid',
                    fgColor:'d0cece'
                },
                border: {
                    left: {
                        style: 'thin',
                        color: 'black',
                    },
                    right: {
                        style: 'thin',
                        color: 'black',
                    },
                    top: {
                        style: 'thin',
                        color: 'black',
                    },
                    bottom: {
                        style: 'thin',
                        color: 'black',
                    },
                    outline: false,
                },
            })
    })
    ws.cell(++row,2,row,10,true)
        .string('ХАРАКТЕРИСТИКА ТМЦ/услуги')
        .style({
            font: {
                bold: true,
            },
            alignment: {
                wrapText: true,
                horizontal: 'center',
            }})
    ++row
    tableNameColumn.forEach((el,index)=>{
        ws.cell(row,index+1)
            .string(el)
            .style({
                font: {
                    bold: true,
                },
                alignment: {
                    wrapText: true,
                    horizontal: 'center',
                    vertical:'center',
                },
                fill:{
                    type: 'pattern',
                    patternType: 'solid',
                    fgColor:'d0cece'
                },
                border: {
                    left: {
                        style: 'thin',
                        color: 'black',
                    },
                    right: {
                        style: 'thin',
                        color: 'black',
                    },
                    top: {
                        style: 'thin',
                        color: 'black',
                    },
                    bottom: {
                        style: 'thin',
                        color: 'black',
                    },
                    outline: false,
                },
            })
    })

    if(table.find(rowEl=>rowEl['razdely_plana']=='<Пусто>')){
        setData(table,ws,'<Пусто>')
        ws.cell(++row,5).string('ИТОГО:').style({font: {bold: true},
            alignment: {
                wrapText: true,
                horizontal: 'right',
                vertical:'center',
            },})
        ws.cell(row,9).number(accumSumm).style({font: {bold: true},
            alignment: {
                wrapText: true,
                horizontal: 'center',
                vertical:'center',
            },})
    }


    razdely.forEach(el=>{
        accumSumm=0
        count=1
        if(el!='<Пусто>'&&table.find(rowEl=>rowEl['razdely_plana']==el)){
            ws.cell(++row,5).string(el).style({font: {bold: true}})
            setData(table,ws,el)
            ws.cell(++row,5).string('ИТОГО:').style({font: {bold: true},
                alignment: {
                    wrapText: true,
                    horizontal: 'right',
                    vertical:'center',
                },})
            ws.cell(row,9).number(accumSumm).style({font: {bold: true},
                alignment: {
                    wrapText: true,
                    horizontal: 'center',
                    vertical:'center',
                },})
        }
    })
}
function setData(table,ws,razdel) {
    table.forEach((rowEl,index1)=>{
        if(rowEl['razdely_plana']==razdel){
            ws.cell(++row,1)
                .string(count+'')
                .style(settings.dataStyle)
            tablePropertys.forEach((el,index)=>{
                ws.cell(row,2+index)
                    .string(rowEl[tablePropertys[index]])
                    .style(settings.dataStyle)
                if(tablePropertys[index]=='summa') accumSumm+=Number(rowEl[tablePropertys[index]])
            })

            count++
        }
    })

}

module.exports.createTAble = createTable