const { xlsxReader } = require('./sub_module/file_reader')
const dataFormat = require('./sub_module/data_format')
const { generateDailyPDFDocument, generateWeeklyPDFDocument } = require('./sub_module/export_pdf')
const getWeeklyReportData = require('./sub_module/handle_weekly_data')

data = xlsxReader('./data/Flight data.xlsx');

function main() {
    process.setMaxListeners(0);
    const convertedData = data.map(item => dataFormat(item))
    Promise.all(convertedData)
    .then(result => {
        result.map(function(item) {
            generateDailyPDFDocument(item)
        })
        getWeeklyReportData(result).forEach(item => generateWeeklyPDFDocument(item))
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

