const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const fs = require("fs");

// function generateHtml(stats) {
//     return new Promise(function(resolve, reject) {
//         var fs = require('fs');
//         const d = new Date();
//         let dateString = `${weekday[d.getDay()]}: ${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`;
//         var htmlContent = `
//             <!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <meta charset="UTF-8">
//                 <meta http-equiv="X-UA-Compatible" content="IE=edge">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <link rel="preconnect" href="https://fonts.googleapis.com">
//                 <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//                 <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet">
//                 <link rel="stylesheet" href="./assets/css/style.css">
//                 <title>Flight Report</title>
//             </head>
//             <body>
//                 <h1 class="report__heading center">Flight daily report</h1>
//                 <h4 class="report__date center">${dateString}</h4>
//                 <p class="report__info center">Flights are recorded on a daily basis,
//                     and are completed based on analyst Le Thai Vi, 
//                     any questions please contact email: xxx@gmail.com
//                 </p>
//                 <div class="report__logo-wrapper">
//                     <img src="./assets/image/image 1.jpg" alt="Flight agency logo" class="report__logo">
//                 </div>
//                 <div class="report__flight-number">
//                     <h4 class="flight__number-heading">
//                         Flight number: 
//                     </h4>
//                     <span class="flight__number">${stats['ID']}</span>
//                 </div>
//                 <div class="report__details">
//                     <div class="report__item">
//                         <h4 class="item__name">Plane name: </h4>
//                         <span class="plane-name">${stats["Aircraft"]}</span>
//                         <h4 class="item__name"> - Captain: </h4>
//                         <span class="captain">${stats['Captain']}</span>
//                     </div>
//                     <div class="report__item">
//                         <h4 class="item__name">Total customer: </h4>
//                         <span class="total-customer">${stats['Total customer']}</span>
//                     </div>
//                     <div class="report__item">
//                         <h4 class="item__name">Revenue: </h4>
//                         <span class="total-customer">${stats['Revenue']} AUD</span>
//                         <h4 class="item__name">- Operation cost: </h4>
//                         <span class="total-customer">${stats['Cost']} AUD</span>
//                         <h4 class="item__name">- Profit: </h4>
//                         <span class="total-customer">${+stats['Revenue'] - stats['Cost']} AUD</span>
//                     </div>
//                     <div class="report__item">
//                         <h4 class="item__name">Date start: </h4>
//                         <span class="total-customer">${stats['Time From']} ${stats['Date from']}</span>
//                     </div>
//                     <div class="report__item">
//                         <h4 class="item__name">Date end: </h4>
//                         <span class="total-customer">${stats['Time To']} ${stats['Date to']}</span>
//                     </div>
//                     <div class="report__item">
//                         <h4 class="item__name">Time flight: </h4>
//                         <span class="total-customer">${Math.abs(stats['Time From'].split(':')[0] - stats['Time To'].split(':')[0])} hour(s)</span>
//                     </div>
//                     <div class="report__item">
//                         <h4 class="item__name">From: </h4>
//                         <span class="total-customer">${stats['From ']}</span>
//                     </div>
//                     <div class="report__item">
//                         <h4 class="item__name">To: </h4>
//                         <span class="total-customer">${stats['To']}</span>
//                     </div>
//                 </div>
//             </body> 
//             </html>
//             `;
//         resolve(fs.writeFileSync('./html_template/index.html', htmlContent))
//     })
// }

function generateHtml(stats) {
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const d = new Date()
        let dateString = `${weekday[d.getDay()]}: ${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`;

        return htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet">
            <title>Flight Report</title>
        </head>
        <body>
            <h1 class="report__heading center">Flight daily report</h1>
            <h4 class="report__date center">${dateString}</h4>
            <p class="report__info center">Flights are recorded on a daily basis,
                and are completed based on analyst Le Thai Vi, 
                any questions please contact email: xxx@gmail.com
            </p>
            <div class="report__logo-wrapper">
                <img src="data:image/jpeg;base64,${
                  fs.readFileSync('./html_template/assets/image/image 1.jpg').toString('base64')
                }"" alt="Flight agency logo" class="report__logo">
            </div>
            <div class="report__flight-number">
                <h4 class="flight__number-heading">
                    Flight number: 
                </h4>
                <span class="flight__number">${stats['ID']}</span>
            </div>
            <div class="report__details">
                <div class="report__item">
                    <h4 class="item__name">Plane name: </h4>
                    <span class="plane-name">${stats["Aircraft"]}</span>
                    <h4 class="item__name"> - Captain: </h4>
                    <span class="captain">${stats['Captain']}</span>
                </div>
                <div class="report__item">
                    <h4 class="item__name">Total customer: </h4>
                    <span class="total-customer">${stats['Total customer']}</span>
                </div>
                <div class="report__item">
                    <h4 class="item__name">Revenue: </h4>
                    <span class="total-customer">${stats['Revenue']} AUD</span>
                    <h4 class="item__name">- Operation cost: </h4>
                    <span class="total-customer">${stats['Cost']} AUD</span>
                    <h4 class="item__name">- Profit: </h4>
                    <span class="total-customer">${+stats['Revenue'] - stats['Cost']} AUD</span>
                </div>
                <div class="report__item">
                    <h4 class="item__name">Date start: </h4>
                    <span class="total-customer">${stats['Time From']} ${stats['Date from']}</span>
                </div>
                <div class="report__item">
                    <h4 class="item__name">Date end: </h4>
                    <span class="total-customer">${stats['Time To']} ${stats['Date to']}</span>
                </div>
                <div class="report__item">
                    <h4 class="item__name">Time flight: </h4>
                    <span class="total-customer">${Math.abs(stats['Time From'].split(':')[0] - stats['Time To'].split(':')[0])} hour(s)</span>
                </div>
                <div class="report__item">
                    <h4 class="item__name">From: </h4>
                    <span class="total-customer">${stats['From ']}</span>
                </div>
                <div class="report__item">
                    <h4 class="item__name">To: </h4>
                    <span class="total-customer">${stats['To']}</span>
                </div>
            </div>
        </body> 
        </html>
            `;
}

module.exports = generateHtml