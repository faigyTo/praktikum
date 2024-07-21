export default function clacSma(data,length,func){
// הפונקציה תקבל מערך של נתונים-נרות ואורך-לפי מה הממוצע הנע מחושב ותחזיר את הממוצע הנע
let chunksArr=chunks(data,length)
let smaArr=chunksArr.map(chunk=>chunk.reduce((acc,element)=>acc+func(element)/length,0))
}

function chunks(data,length) {
    let data2=data.filter((candle,index)=>index>=length)
    return data2.reduce((chunksArr,candle,index)=>[...chunksArr,data.slice(index-length,index)],[])// למשל בממוצע נע 10- מחזיר מערך שכל איבר בו הוא מערך של 10 נרות
}
