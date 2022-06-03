let dataStyle;
function setWidthColumn(ws,wb) {
    ws.column(1).setWidth(10);
    ws.column(2).setWidth(36);
    ws.column(3).setWidth(26);
    ws.column(4).setWidth(10);
    ws.column(5).setWidth(40);
    ws.column(6).setWidth(10);
    ws.column(7).setWidth(10);
    ws.column(8).setWidth(10);
    ws.column(9).setWidth(18);
    ws.column(10).setWidth(10);
    ws.column(11).setWidth(10);
     dataStyle = wb.createStyle({
         font: { // §18.8.22
             family: 'roman',
             size: 9,
         },
         alignment: {
             vertical:'center',
             wrapText: true,
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
        }
    })
    module.exports.dataStyle = dataStyle
}

module.exports.setWidthColumn =  setWidthColumn
