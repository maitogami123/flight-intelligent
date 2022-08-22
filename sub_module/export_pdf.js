const PDFDocument = require('pdfkit');
const fs = require('fs')

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

module.exports = generateDailyPDFDocument;