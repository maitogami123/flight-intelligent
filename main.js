const { xlsxReader } = require('./sub_module/file_reader')
const dataFormat = require('./sub_module/data_format')
const generatePDFDocument = require('./sub_module/export_pdf')

data = xlsxReader('./data/Flight data.xlsx');

function main() {
    process.setMaxListeners(0);
    const convertedData = data.map(item => dataFormat(item))
    Promise.all(convertedData)
    .then(result => {
        result.map(function(item) {
            generatePDFDocument(item)
        })
    });
}

main()

// TODO:
// Round up floating point money: done
// Correct flight time calculation: done
// Date format: MM, DD, YYYY: done
// Ex: Dec, 13, 2022
// Reformat export pdf using pdfkit: done
// Export weekly report: WIP
// Logic xác định tuần

