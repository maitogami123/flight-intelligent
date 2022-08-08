const puppeteer = require('puppeteer')
const generateHtml = require('./generate_html')
const fs = require('fs')

const captureScreenshot = async (stats) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  })
  const d = new Date()
  fileName = `_${d.getMonth()}_${d.getDate()}_${d.getFullYear()}_${d.getHours()}_${d.getMinutes()}_${d.getSeconds()}_${d.getMilliseconds()}`;
  let outputPath = "./output/Flight Report"+ fileName +".pdf"
  fs.writeFileSync(outputPath, '');
  const page = await browser.newPage()
  await page.setContent(generateHtml(stats))
  await page.addStyleTag( {
      path: './html_template/assets/css/style.css'
    }
  )
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
    }
  })
  await browser.close()
}

module.exports = captureScreenshot;