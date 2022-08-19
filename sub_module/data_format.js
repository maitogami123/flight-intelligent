const { csvReader } = require('./file_reader')

function handleFormatDate(date, time) {
    let dateElements = date.split('/');
    let temp = "20" + dateElements.pop()
    dateElements = [temp, ...dateElements, ...time.split(':')]
    return new Date(...dateElements)
}

async function dataFormat(stats) {
    let currencyRates = await csvReader('./data/AUD convert.csv')
    let cityList = await csvReader('./data/City.csv')
    let flightIds = await csvReader('./data/FlightID.csv')
    let rate = currencyRates.find(item => item.includes(stats['Currency Unit']))
    let flightFrom = cityList.find(item => item.includes(stats['From ']))
    let flightTo = cityList.find(item => item.includes(stats['To']))
    let flightId = flightIds.find(item => item.includes(stats['ID']))
    const d1 = handleFormatDate(stats["Date from"], stats["Time From"])
    const d2 = handleFormatDate(stats["Date to"], stats["Time To"])
    const diffTime = Math.abs(d2 - d1);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); 
    stats = {
        ...stats,
        'Cost': Math.round(stats['Cost'].split(',').join('') * rate[1]),
        'Revenue': Math.round(stats['Revenue'].split(',').join('') * rate[1]),
        'Captain': flightId[2],
        'Aircraft': flightId[1],
        'From ': `${flightFrom[0]}, ${flightFrom[2]}`,
        'To': `${flightTo[0]}, ${flightTo[2]}`,
        'Flight time': diffHours
    }
    return new Promise((resolve, reject) => {
        resolve(stats)
    })
}

module.exports = dataFormat