function getObjectList(data, type) {
    const collection = {}
    data.forEach(item => {
        if ([...Object.keys(collection)].includes(item[type]))
        collection[item[type]] += 1;
    else
        collection[item[type]] = 1;
    })
    return collection
}

function getMaxValue(collection) {
    const max = Math.max(...Object.values(collection)) 
    for (let i = 0; i < Object.keys(collection).length; i++) {
        if (collection[Object.keys(collection)[i]] === max) 
           return Object.keys(collection)[i]
    }
}

function getWeeklyReportData(dataSheet) {
  const weeklyReport = {}

  const airCrafts = getObjectList(dataSheet, 'Aircraft')
  const departure = getObjectList(dataSheet, 'From ')
  const destination = getObjectList(dataSheet, 'To')
  
  const departureCountry = {}
  Object.keys(departure).forEach(item => {
      if (Object.keys(departureCountry).includes(item.trim().split(',')[1]))
          departureCountry[item.trim().split(',')[1]] += departure[item]
      else
          departureCountry[item.trim().split(',')[1]] = departure[item]
  })

  let revenuePerDay = {};
  dataSheet.forEach(item => {
    if (Object.keys(revenuePerDay).includes(item['Date from']))
      revenuePerDay[item['Date from']] += (item['Revenue'] - item['Cost']);
    else
      revenuePerDay[item['Date from']] = (item['Revenue'] - item['Cost']);
  })

  weeklyReport['Most used air craft'] = getMaxValue(airCrafts)
  weeklyReport['Most departure location'] = getMaxValue(departure)
  weeklyReport['Most destination'] = getMaxValue(destination)
  
  weeklyReport['Total customers'] = dataSheet.reduce((prev, curr) => prev += parseInt(curr['Total customer']), 0)
  weeklyReport['Total flight time'] = dataSheet.reduce((prev, curr) => prev += parseInt(curr['Flight time']), 0)
  weeklyReport['Average flight time'] = Math.round(weeklyReport['Total flight time']/dataSheet.length)
  weeklyReport['Revenue per day'] = revenuePerDay
  weeklyReport['Departure country'] = departureCountry
  return weeklyReport
}

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  return weekNo;
}

function generateWeeklyDataSet(dataSheet) {
  let reportItems = []
  reportItems = getWeeklyReportData(dataSheet)
  return reportItems
}

module.exports = generateWeeklyDataSet
