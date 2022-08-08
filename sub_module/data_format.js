const { csvReader } = require('./file_reader')
const { xlsxReader } = require('./file_reader')


async function dataFormat(stats) {
    let currencyRates = await csvReader('./data/AUD convert.csv')
    let cityList = await csvReader('./data/City.csv')
    let flightIds = await csvReader('./data/FlightID.csv')
    let rate = currencyRates.find(item => item.includes(stats['Currency Unit']))
    let flightFrom = cityList.find(item => item.includes(stats['From ']))
    let flightTo = cityList.find(item => item.includes(stats['To']))
    let flightId = flightIds.find(item => item.includes(stats['ID']))
    stats = {
        ...stats,
        'Cost': stats['Cost'].split(',').join('') * rate[1],
        'Revenue': stats['Revenue'].split(',').join('') * rate[1],
        'Captain': flightId[2],
        'Aircraft': flightId[1],
        'From ': `${flightFrom[0]}, ${flightFrom[2]}`,
        'To': `${flightTo[0]}, ${flightTo[2]}`
    }
    return new Promise((resolve, reject) => {
        resolve(stats)
    })
}

module.exports = dataFormat
