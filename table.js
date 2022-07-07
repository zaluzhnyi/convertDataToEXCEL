const settings = require('./settings.js')
const tableNameColumn = ['№ п/п', 'Статья бюджета', 'Наименование товара /торговая марка', 'Фасовка', 'Характеристики (требование к качеству, техническим и функциональным характеристикам, к их безопасности, размерам, упаковке и иным показателям, связанных с определением соответствия поставляемого товара, потребностям заказчика, целесообразность и обоснованность приобретения товара)', 'Ед. изм.', 'Кол-во', 'Цена', 'Сумма', 'Остатки на складах', 'Желаемые сроки поставки']
const cardNameColumn2 = ['Дата', 'Период', 'Структурное подразделение', 'ФИО Инициатора, контакт, электронная почта']
const cardPropertys = ['data', 'period', 'podrazdelenie', 'iniciator']
const tablePropertys = ['budget_item', 'nameProduct', 'fasovka', 'kharakteristiki', 'ed_izm', 'kolvo', 'cena', 'summa', 'ostatki', 'dataPostavki']
let row
let count
let accumSumm
const TableVizant = {
    createTablePlan: function (ws, wb, table, card, razdely) {
        function setData(table, ws, razdel) {
            table.forEach((rowEl, index1) => {
                if (rowEl['razdely_plana'] == razdel) {
                    ws.cell(++row, 1)
                        .string(count + '')
                        .style(settings.dataStyle)
                    tablePropertys.forEach((el, index) => {
                        ws.cell(row, 2 + index)
                            .string(rowEl[tablePropertys[index]])
                            .style(settings.dataStyle)
                        if (tablePropertys[index] == 'summa') accumSumm += Number(rowEl[tablePropertys[index]])
                    })

                    count++
                }
            })

        }

        row = 1
        count = 1
        accumSumm = 0
        settings.setWidthColumnPlanZak(ws, wb)
        ws.cell(row, 1, row, 11, true)
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
        ws.cell(++row, 1, row, 11, true)
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
        ws.cell(++row, 1, row, 11, true)
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

        cardNameColumn2.forEach((el, index) => {

            ws.cell(++row, 1, row, 2, true)
                .string(el)
                .style({
                    font: {
                        bold: true,
                    },
                    alignment: {
                        wrapText: true,
                        horizontal: 'left',
                    },
                    fill: {
                        type: 'pattern',
                        patternType: 'solid',
                        fgColor: 'd0cece'
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
            ws.cell(row, 3, row, 11, true)
                .string(card[cardPropertys[index]])
                .style({
                    font: {
                        bold: true,
                    },
                    alignment: {
                        wrapText: true,
                        horizontal: 'center',
                    },
                    fill: {
                        type: 'pattern',
                        patternType: 'solid',
                        fgColor: 'd0cece'
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
        ws.cell(++row, 2, row, 10, true)
            .string('ХАРАКТЕРИСТИКА ТМЦ/услуги')
            .style({
                font: {
                    bold: true,
                },
                alignment: {
                    wrapText: true,
                    horizontal: 'center',
                }
            })
        ++row
        tableNameColumn.forEach((el, index) => {
            ws.cell(row, index + 1)
                .string(el)
                .style({
                    font: {
                        bold: true,
                    },
                    alignment: {
                        wrapText: true,
                        horizontal: 'center',
                        vertical: 'center',
                    },
                    fill: {
                        type: 'pattern',
                        patternType: 'solid',
                        fgColor: 'd0cece'
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

        if (table.find(rowEl => rowEl['razdely_plana'] == '<Пусто>')) {
            setData(table, ws, '<Пусто>')
            ws.cell(++row, 5)
                .string('ИТОГО:')
                .style({
                    font: {bold: true},
                    alignment: {
                        wrapText: true,
                        horizontal: 'right',
                        vertical: 'center',
                    },
                })
            ws.cell(row, 9)
                .number(accumSumm)
                .style({
                    font: {bold: true},
                    alignment: {
                        wrapText: true,
                        horizontal: 'center',
                        vertical: 'center',
                    },
                })
        }


        razdely.forEach(el => {
            accumSumm = 0
            count = 1
            if (el != '<Пусто>' && table.find(rowEl => rowEl['razdely_plana'] == el)) {
                ws.cell(++row, 5)
                    .string(el)
                    .style({font: {bold: true}})
                setData(table, ws, el)
                ws.cell(++row, 5)
                    .string('ИТОГО:')
                    .style({
                        font: {bold: true},
                        alignment: {
                            wrapText: true,
                            horizontal: 'right',
                            vertical: 'center',
                        },
                    })
                ws.cell(row, 9)
                    .number(accumSumm)
                    .style({
                        font: {bold: true},
                        alignment: {
                            wrapText: true,
                            horizontal: 'center',
                            vertical: 'center',
                        },
                    })
            }
        })
    },
    createTableTender: function (data, ws, wb) {
        const {name, tablePosition, zayavkaArray} = data
        let row = 10
        settings.setWidthColumnTender(ws, wb)
        ws.addImage({
            path: './images/VizantLogo.png',
            type: 'picture',
            position: {
                type: 'absoluteAnchor',
                x: '0.2in',
                y: '0.2in',
            },
        })
        const borderStyle = wb.createStyle({
            font: {
                size: 10,
                name: 'Arial',
                italics: true
            },
            alignment: {
                wrapText: true,
                horizontal: 'center',
                vertical: 'center'
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
        });
        const borderStyleTablePosition = wb.createStyle({
            font: {
                size: 10,
                name: 'Times New Roman',
            },
            alignment: {
                wrapText: true,
                horizontal: 'center',
                vertical: 'center',
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
        ws.cell(1, 13, 1, 13, true)
            .string('УТВЕРЖДАЮ')
            .style({
                alignment: {
                    horizontal: 'right',
                },
                font: {
                    size: 14,
                }
            })
        ws.cell(2, 12, 2, 13, true)
            .string('Генеральный директор')
            .style({
                alignment: {
                    horizontal: 'right',
                },
                font: {
                    size: 14,
                }
            })
        ws.cell(3, 12, 3, 13, true)
            .string('ООО "УК "Визант Групп"')
            .style({
                alignment: {
                    horizontal: 'right',
                },
                font: {
                    size: 14,
                }
            })
        ws.cell(3, 3, 3, 3, true)
            .string('ООО "УК"Визант Групп"')
            .style({
                alignment: {
                    horizontal: 'center',
                },
                font: {
                    bold: true,
                    size: 12,
                }
            })
        ws.cell(5, 12, 5, 13, true)
            .string('___________________ /Шатова Н.Б/')
            .style({
                alignment: {
                    horizontal: 'right',
                },
                font: {
                    size: 14,
                }
            })
        ws.cell(7, 12, 7, 13, true)
            .string('"____" ________________20___ г.')
            .style({
                alignment: {
                    horizontal: 'right',
                },
                font: {
                    size: 14,
                }
            })
        ws.cell(8, 4, 8, 9, true)
            .string(name.tenderIndex)
            .style({
                alignment: {
                    horizontal: 'center',
                },
                font: {
                    bold: true,
                    size: 14,
                }
            })
        ws.cell(9, 4, 9, 9, true)
            .string(name.nameZayavka)
            .style({
                alignment: {
                    horizontal: 'center',
                },
                font: {
                    bold: true,
                    size: 14,
                }
            })
        setData(ws, borderStyle)
        ws.cell(row + 2, 3, row + 2, 5, true)
            .string('Директор по строительству и эксплуатаци    ______________________/Ф.И.О/')
            .style({
                alignment: {
                    horizontal: 'left',
                },
                font: {
                    size: 12,
                }
            })
        ws.cell(row + 4, 3, row + 4, 5, true)
            .string('Директор по безопасности    ______________________/Ф.И.О/')
            .style({
                alignment: {
                    horizontal: 'left',
                },
                font: {
                    size: 12,
                }
            })
        ws.cell(row + 6, 3, row + 6, 5, true)
            .string('Финансовый директор    ______________________/Ф.И.О/')
            .style({
                alignment: {
                    horizontal: 'left',
                },
                font: {
                    size: 12,
                }
            })
        ws.cell(row + 8, 3, row + 8, 5, true)
            .string('Ответственный за проведение тендера    ______________________/Ф.И.О/')
            .style({
                alignment: {
                    horizontal: 'left',
                },
                font: {
                    size: 12,
                }
            })

        function setData(ws, borderStyle) {

            let column = 4
            const arrayNames = ['УЧАСТНИК (Юридическое название, ИНН)', 'Контактные данные представителя', 'Дата получения коммерческого предложения:', 'Валюта предложения:', 'НДС, %', 'ИТОГО:', 'Стоимость закупки с возмещением НДС 5%', 'Срок и график выполнения работ:', 'Условия оплаты:', 'ИТОГО к ЗАКУПКЕ', 'Система налогообложения (ОСН/УСН):', 'Место, занятое участником', 'Примечания:']
            const arrayDataNames = ['companyName', 'contactName', 'data_predlozheniya', 'valuta', 'sum', 'nds', 'itogo', 'cell', 'dateToDate', 'yslovia', 'itogo2', 'osn', 'mesto', 'comment']
            arrayNames.forEach(el => {
                row++
                switch (true) {
                    case row == 15:
                        ws.cell(row, 2, row, 2, true)
                            .string('№ п/п')
                            .style(borderStyleTablePosition)
                        ws.cell(row, 3, row, 3, true)
                            .string('Наименование')
                            .style(borderStyleTablePosition)
                        ws.cell(row, 4, row, 4, true)
                            .string('Ед. изм.')
                            .style(borderStyleTablePosition)
                        ws.cell(row, 5, row, 5, true)
                            .string('Кол-во')
                            .style(borderStyleTablePosition)
                        row++
                    case row == 16:
                        tablePosition.forEach((el, index) => {
                            ws.cell(row, 2, row, 2)
                                .string((++index).toString())
                                .style(borderStyleTablePosition)
                            ws.cell(row, 3, row, 3)
                                .string(el['name'])
                                .style(borderStyleTablePosition)
                            ws.cell(row, 4, row, 4)
                                .string(el['izm'])
                                .style(borderStyleTablePosition)
                            ws.cell(row, 5, row, 5)
                                .string(el['kol'].toString())
                                .style(borderStyleTablePosition)
                            row++
                        })
                    case row != 15 && row != 16:
                        ws.cell(row, 2, row, 5, true)
                            .string(el)
                            .style(borderStyle)
                        break;

                }
            })
            row = 11
            zayavkaArray.forEach(el => {
                column += 2
                row = 11
                ws.column(column)
                    .setWidth(20);
                ws.column(column + 1)
                    .setWidth(20);
                arrayDataNames.forEach(name => {
                    if (name != 'sum') {
                        ws.cell(row, column, row, column + 1, true)
                            .string(el[name])
                            .style(borderStyleTablePosition)
                        row++
                    } else {
                        ws.cell(row, column, row, column)
                            .string("Цена")
                            .style(borderStyleTablePosition)
                        ws.cell(row, column + 1, row, column + 1)
                            .string("Сумма")
                            .style(borderStyleTablePosition)
                        row++
                        el[name].forEach(data => {
                            ws.cell(row, column, row, column)
                                .string(data['cena'].toString())
                                .style(borderStyleTablePosition)
                            ws.cell(row, column + 1, row, column + 1)
                                .string(data['summa'].toString())
                                .style(borderStyleTablePosition)
                            row++
                        })

                    }

                })
            })
        }
    }
}


module.exports = TableVizant
// module.exports.createTAble = createTable