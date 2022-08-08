const xlsxReader  = require('./sub_module/xlsx_reader');

const data = xlsxReader('./data/Flight data.xlsx')
console.log(data[0])
