export default function clacSma(data,length,func){
// הפונקציה תקבל מערך של נתונים-נרות ואורך-לפי מה הממוצע הנע מחושב ותחזיר את הממוצע הנע
function chunks(data,length) {
    let data2=data.filter((candle,index)=>index<=data.length-length)
    return data2.reduce((chunksArr,candle,index)=>[...chunksArr,data.slice(index,index+length)],[])// למשל בממוצע נע 10- מחזיר מערך שכל איבר בו הוא מערך של 10 נרות
}

let chunksArr=chunks(data,length)
let smaArr=chunksArr.map(chunk=>chunk.reduce((acc,element)=>acc+func(element)/length,0))
}


