const PDFDocument = require('pdfkit');
const fs = require('fs')
const GoogleChartsNode = require('google-charts-node');

const generateDailyPDFDocument = async (stats) => {
  // Create a document
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const d = new Date()
  let dateString = `${weekday[d.getDay()]}: ${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`;

  let reportDate = stats['Date from'].split('/').join('_');
  fileName = `${stats['ID']}_${reportDate}`;
  let outputPath = "./output/Daily Report/"+ fileName +".pdf";

  const doc = new PDFDocument();
  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  doc.pipe(fs.createWriteStream(outputPath));
  
  // Embed a font, set the font size, and render some text
  doc
    .fontSize(32)
    .text('Flight daily report', {
      width: 450,
      align: 'center'
    });
  
  doc
    .moveDown(0);
  doc
    .fontSize(14)
    .text(`${dateString}`, {
      width: 450,
      align: 'center'
  })
  
  doc
    .moveDown(0);
  doc
    .fontSize(14)
  .text(`Flights are recorded on a daily basis, and are completed based on analyst Le Thai Vi, any questions please contact email: xxx@gmail.com`, 
    {
      width: 475,
      align: 'center'
    }
  )
  
  doc
    .moveDown(1);
  doc.image('./assets/image/image 1.jpg', (doc.page.width - 177) /2);
  
  doc
    .moveDown(0.5);
  doc
    .font('assets/fonts/Roboto-Bold.ttf')
    .fontSize(14)
    .text(`Flight number: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['ID']}`)
  
  doc
    .moveDown(0.5);
  doc
    .polygon([doc.x - 10, doc.y + 4], [doc.x - 10 + 5, doc.y + 4 + 5], [doc.x - 10, doc.y + 4 + 10])
    .fill('gray')
  
  doc
    .fillColor('black')
    .font('assets/fonts/Roboto-Bold.ttf')
    .fontSize(14)
    .text(`Plane name: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats["Aircraft"]} - `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Bold.ttf')
    .text(`Captain: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['Captain']}`)
  
  doc
    .moveDown(0.5);
  doc
    .polygon([doc.x - 10, doc.y + 4], [doc.x - 10 + 5, doc.y + 4 + 5], [doc.x - 10, doc.y + 4 + 10])
    .fill('gray')
  
  doc
    .fillColor('black')
    .font('assets/fonts/Roboto-Bold.ttf')
    .text(`Total customers: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['Total customer']}`)
    
  doc
    .moveDown(0.5);
  doc
    .polygon([doc.x - 10, doc.y + 4], [doc.x - 10 + 5, doc.y + 4 + 5], [doc.x - 10, doc.y + 4 + 10])
    .fill('gray')
  
  doc
    .fillColor('black')
    .font('assets/fonts/Roboto-Bold.ttf')
    .fontSize(14)
    .text(`Revenue: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['Revenue']} AUD - `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Bold.ttf')
    .text(` Operation cost: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['Cost']} AUD - `)
    .font('assets/fonts/Roboto-Bold.ttf')
    .text(`Profit: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['Revenue'] - stats['Cost']} AUD`)
  
  doc
    .moveDown(0.5);
  doc
    .polygon([doc.x - 10, doc.y + 4], [doc.x - 10 + 5, doc.y + 4 + 5], [doc.x - 10, doc.y + 4 + 10])
    .fill('gray')
  
  doc
    .fillColor('black')
    .font('assets/fonts/Roboto-Bold.ttf')
    .text(`Date start: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['Time From']} ${(new Date(stats['Date from'].split('/').join(' '))).toLocaleString('en-us', { month: 'short', day: 'numeric', year: 'numeric'})}`)
  
  doc
    .moveDown(0.5);
  doc
    .polygon([doc.x - 10, doc.y + 4], [doc.x - 10 + 5, doc.y + 4 + 5], [doc.x - 10, doc.y + 4 + 10])
    .fill('gray')
  
  doc
    .fillColor('black')
    .font('assets/fonts/Roboto-Bold.ttf')
    .text(`Date end: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['Time To']} ${(new Date(stats['Date to'].split('/').join(' '))).toLocaleString('en-us', { month: 'short', day: 'numeric', year: 'numeric'})}`)

  doc
    .moveDown(0.5);
  doc
    .polygon([doc.x - 10, doc.y + 4], [doc.x - 10 + 5, doc.y + 4 + 5], [doc.x - 10, doc.y + 4 + 10])
    .fill('gray')
  
  doc
    .fillColor('black')
    .font('assets/fonts/Roboto-Bold.ttf')
    .text(`Flight time: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['Flight time']} hours`)

  doc
    .moveDown(0.5);
  doc
    .polygon([doc.x - 10, doc.y + 4], [doc.x - 10 + 5, doc.y + 4 + 5], [doc.x - 10, doc.y + 4 + 10])
    .fill('gray')
  
  doc
    .fillColor('black')
    .font('assets/fonts/Roboto-Bold.ttf')
    .text(`From: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['From ']}`)
  
  doc
    .moveDown(0.5);
  doc
    .polygon([doc.x - 10, doc.y + 4], [doc.x - 10 + 5, doc.y + 4 + 5], [doc.x - 10, doc.y + 4 + 10])
    .fill('gray')
  
  doc
    .fillColor('black')
    .font('assets/fonts/Roboto-Bold.ttf')
    .text(`To: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['To']}`)

  // Finalize PDF file
  doc.end();
}

const generateWeeklyPDFDocument = async (stats) => {
  // Create a document
  const doc = new PDFDocument();
  
  const date = Object.keys(stats['Revenue per day']).sort()[0].split('/').join('_')
  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  doc.pipe(fs.createWriteStream('./output/Weekly Report/'+ date +'.pdf'));
  
  // Embed a font, set the font size, and render some text
  doc
    .fillColor('#30669A')
    .fontSize(32)
    .text('Flight weekly report', {
      width: 450,
      align: 'center'
    });
  
  doc
    .moveDown(0);
  doc
    .fontSize(14)
    .text(`Report date: ${Object.keys(stats['Revenue per day']).sort()[0]}`, {
      width: 450,
      align: 'center'
  })

  doc
    .moveDown(0);
  doc
    .fillColor('black')
    .fontSize(14)
  .text(`Flights ares agregate base on a daily basis, and are completed based on analyst Le Thai Vi, any questions please contact email: xxx@gmail.com`, 
    {
      width: 475,
      align: 'center'
    }
  )
  
  doc
    .moveDown(1);
  // Add an image, constrain it to a given size, and center it vertically and horizontally
  doc
    .translate(50, 0)
    .image('./assets/image/image 1.jpg', (doc.page.width - 250));
    
  doc
    .moveDown(0.5);
  doc
    .translate(-50, -125)
    .polygon([doc.x - 10, doc.y + 4], [doc.x - 10 + 5, doc.y + 4 + 5], [doc.x - 10, doc.y + 4 + 10])
    .fill('gray')
  
  doc
    .fillColor('black')
    .font('assets/fonts/Roboto-Bold.ttf')
    .fontSize(14)
    .text(`Most used aircraft: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['Most used air craft']}`)
  
  doc
    .moveDown(0.5);
  doc
    .polygon([doc.x - 10, doc.y + 4], [doc.x - 10 + 5, doc.y + 4 + 5], [doc.x - 10, doc.y + 4 + 10])
    .fill('gray')
  
  doc
    .fillColor('black')
    .font('assets/fonts/Roboto-Bold.ttf')
    .text(`Total customers this week: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['Total customers']}`)

  doc
    .moveDown(0.5);
  doc
    .polygon([doc.x - 10, doc.y + 4], [doc.x - 10 + 5, doc.y + 4 + 5], [doc.x - 10, doc.y + 4 + 10])
    .fill('gray')
  
  doc
    .fillColor('black')
    .font('assets/fonts/Roboto-Bold.ttf')
    .text(`Total flight time this week: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['Total flight time']} hours`)
  
  doc
    .moveDown(0.5);
  doc
    .polygon([doc.x - 10, doc.y + 4], [doc.x - 10 + 5, doc.y + 4 + 5], [doc.x - 10, doc.y + 4 + 10])
    .fill('gray')
  
  doc
    .fillColor('black')
    .font('assets/fonts/Roboto-Bold.ttf')
    .text(`Average flight time this week: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['Average flight time']} hours`)
  
  doc
    .moveDown(0.5);
  doc
    .polygon([doc.x - 10, doc.y + 4], [doc.x - 10 + 5, doc.y + 4 + 5], [doc.x - 10, doc.y + 4 + 10])
    .fill('gray')
  
  doc
    .fillColor('black')
    .font('assets/fonts/Roboto-Bold.ttf')
    .text(`Most depart location: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['Most departure location']}`)

  doc
    .moveDown(0.5);
  doc
    .polygon([doc.x - 10, doc.y + 4], [doc.x - 10 + 5, doc.y + 4 + 5], [doc.x - 10, doc.y + 4 + 10])
    .fill('gray')
  
  doc
    .fillColor('black')
    .font('assets/fonts/Roboto-Bold.ttf')
    .text(`Most arrival location: `, {
      continued: true
    })
    .font('assets/fonts/Roboto-Light.ttf')
    .text(`${stats['Most destination']}`)

  doc.translate(-100, 0)

  let revenuePerDay = []
  for (let i = 0; i < Object.keys(stats['Revenue per day']).length; i++) {
    revenuePerDay.push([Object.keys(stats['Revenue per day'])[i], Object.values(stats['Revenue per day'])[i]])
  }

  revenuePerDay.sort()

  let template = '["Weekday", "Profit"],'
  for (let i = 0; i < revenuePerDay.length; i++) {
    template += `['${revenuePerDay[i][0]}', ${revenuePerDay[i][1]}],`
  }

  let drawChartStr = `
      // Create the data table.
      var data = google.visualization.arrayToDataTable([${template}]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                      { calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation" },
                      ]);

      var options = {
        title: "Biểu đồ lợi nhuận hàng ngày",
        width: 700,
        height: 400,
        bar: {groupWidth: "50%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
      chart.draw(view, options);
  `;
  doc.image(await GoogleChartsNode.render(drawChartStr));
  doc.translate(100, 0)

  doc.addPage()
  doc.translate(-100, 0)
  let departureCountries = []
  for (let i = 0; i < Object.keys(stats['Departure country']).length; i++) {
    departureCountries.push([Object.keys(stats['Departure country'])[i], Object.values(stats['Departure country'])[i]])
  }

  template = '["Departure country", "percent"],'

  for (let i = 0; i < departureCountries.length; i++) {
    template += `['${departureCountries[i][0]}', ${departureCountries[i][1]}],`
  }

  drawChartStr = `
    // Create the data table.
    var data = google.visualization.arrayToDataTable([${template}]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                    { calc: "stringify",
                      sourceColumn: 1,
                      type: "string",
                      role: "annotation" },
                    ]);

    var options = {
      title: "Biểu đồ các quốc gia khởi hành",
      width: 700,
      height: 400,
      bar: {groupWidth: "50%"},
      legend: { position: "right" },
    };
    var chart = new google.visualization.PieChart(document.getElementById("columnchart_values"));
    chart.draw(view, options);
  `;

  doc.image(await GoogleChartsNode.render(drawChartStr));
  // Finalize PDF file
  doc.end();
}

exports.generateDailyPDFDocument = generateDailyPDFDocument;
exports.generateWeeklyPDFDocument = generateWeeklyPDFDocument;