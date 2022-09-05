const getLookupData = require('./look_up_database')

function handleFormatDate(date, time) {
    let dateElements = date.split('/');
    let temp = "20" + dateElements.pop()
    dateElements = [temp, ...dateElements, ...time.split(':')]
    return new Date(...dateElements)
}

async function dataFormat(stats) {
    let lookupData = await getLookupData()
    let currencyRates = lookupData['currencyRate']
    let cityList = lookupData['City']
    let flightIds = lookupData['FlightID']
    let rate = currencyRates[stats['Currency Unit']]
    let flightFrom = ''
    Object.keys(cityList).forEach(key => {
        if (Object.keys(cityList[key]).includes(stats['From '])) {
            flightFrom = (cityList[key][stats['From ']]) + `, ${cityList[key]['fullName']}`
        }
    })

    let flightTo = ''
    Object.keys(cityList).forEach(key => {
        if (Object.keys(cityList[key]).includes(stats['To'])) {
            flightTo = (cityList[key][stats['To']]) +  `, ${cityList[key]['fullName']}`
        }
    })

    const d1 = handleFormatDate(stats["Date from"], stats["Time From"])
    const d2 = handleFormatDate(stats["Date to"], stats["Time To"])
    const diffTime = Math.abs(d2 - d1);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    stats = {
        ...stats,
        'Cost': Math.round(stats['Cost'].split(',').join('') * (rate)),
        'Revenue': Math.round(stats['Revenue'].split(',').join('') * (rate)),
        'Captain': flightIds[stats['ID']]['captain'],
        'Aircraft': flightIds[stats['ID']]['aircraft'],
        'From ': `${flightFrom}`,
        'To': `${flightTo}`,
        'Flight time': diffHours
    }
    return new Promise((resolve, reject) => {
        resolve(stats)
    })
}

module.exports = dataFormat