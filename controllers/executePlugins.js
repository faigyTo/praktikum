import config from '../services/plugins/config.json' assert {'type':"json"};

export const runPlugins =()=>{
    // לבקש מצוות 4 לבנות בשרת שלהם פונקציה שמקבלת מספר ומחזירה נתונים של איקס ימים אחרונים לכל המניות
    // [
    //     {symbol:'שם המניה',data:[{candle},{candle}...]},
    //     {symbol:'',data:[{candle},{candle}...]},
    //     {symbol:'',data:[{candle},{candle}...]},
    // ]  
    //לעבור על קובץ הקונפיג
    // קריאה לפונקציה משרת של צוות 4
    // עוברים על הקובץ קונפיגורציה הכללי
    //לכל איבר בקובץ קונפיגורציה-נריץ את הפלאגין בשם המפתח ונשלח לו את הדטה של המניה של שנה אחרונה ואת השדה של המפתח שזה הפרמטרים 

    config.forEach((item)=>{
        console.log(Object.keys(item));// המפתח של האובייקט
        console.log(item[Object.keys(item)]);// הערך שבתוך האובייקט
        
        let functions=Object.keys(item);
        let params=item[Object.keys(item)]; 

    })
}