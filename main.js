const {xlsxReader} = require('./sub_module/file_reader')
const generateHTML = require('./sub_module/generate_html')
const dataFormat = require('./sub_module/data_format')
const captureScreenshot = require('./sub_module/export_pdf')

data = xlsxReader('./data/Flight data.xlsx');

function main() {
    process.setMaxListeners(0);
    const convertedData = data.map(item => dataFormat(item))
    Promise.all(convertedData)
    .then(result => {
        result.map(function(item) {
            captureScreenshot(item)
        })
    });
}

main()