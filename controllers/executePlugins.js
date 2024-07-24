import pluginArr from '../services/plugins/config.json' assert {'type':"json"};


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



export default function runPlugins(instances) {
    pluginArr.map(params => {
        let [pluginName,pluginValue] = Object.entries(params)[0]
        let instance = instances.find(ins => ins.name == pluginName).instance
        instance.execute(pluginValue)
    })
}