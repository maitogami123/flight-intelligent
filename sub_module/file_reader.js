function xlsxReader(path) {
    const reader = require('xlsx')
    
    const file = reader.readFile(path)
    
    let sheet = 'Sheet1'
    let ws = file.Sheets[sheet]
    ws['!ref'] = "A2:Z10000"
    
    const temp = reader.utils.sheet_to_json(ws, {
        raw: false,
    })
    
    return temp;

}

function csvReader(path) {
    
    return new Promise((resolve, reject) => {
        const fs = require('fs');
        const CsvReadableStream = require('csv-reader');
        let data = []
        let inputStream = fs.createReadStream(path, 'utf8');
    
        inputStream
            .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
            .on('data', function (row) {
                data.push(row)
            }).on('end', () => resolve(data))
        
    })
}

exports.xlsxReader = xlsxReader
exports.csvReader = csvReader