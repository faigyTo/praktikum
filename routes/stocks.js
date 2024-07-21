const express = require("express")
const fs = require('fs');
const path = require('path');

function readCsvDataSync(filePath) {
   try {
      let dataString = fs.readFileSync(filePath, 'utf8');
      let first = "Date,Open,Low,High,Close,AdjClose,Volume";
      let data = dataString.split("\n").filter(row => row != ""); // data -> [ "row" , "row" , "row" , "row" ]
      let finalData = data.map(row => {
         return row.split(",").reduce((acc, field, index) => {
            return { ...acc, [first.split(",")[index]]: index == 0 ? new Date(field) : parseFloat(field) }
         }, {})
      })
      return finalData;
   }
   catch (error) {
      console.log(error);
   }
}

const stocksRouter = express.Router();
stocksRouter.get('/stock/id', controlStock)

function extrenal() {// הפונקציה תורץ כל יום מחדש
   // שליפת שערי המניות של 50 יום אחרונים לכל מניה
   let dataFor50Days = readCsvDataSync('../A.csv');
   let avg50 = getAvg(50, dataFor50Days);
   let avg20 = getAvg(20, dataFor50Days);
   let avg10 = getAvg(10, dataFor50Days);
   // [  { high low open close valume} ]



}


// פונקציה שמקבלת מהשרת של קבוצה 4 את הטווח של 50 הימים האחרונים של כל המניות
// istockומכניסה את כל הנתונים למערך מסוג 

function getAvg(length, data) {
   let data2 = data.filter((e, index) => index <= data.length - length)
   let sliceData = data2.reduce((acc, current, index) => [...acc, data.slice(index, index + length)], [])
   let arrSma = sliceData.map(slice => slice.reduce((acc, elem) => acc + elem.Close / length, 0))
   return arrSma[arrSma.length-1];
}

//פונקציה זו אמורה לחשב את מחיר היום הנוכחי ביחס לממוצע הנע שנשלח אליה
function calcPriceVsAvg(avg,){

}