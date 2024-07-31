import { connectToDB } from "../config/DBConfig.js";

export default function  saveNotifactionInDB(type, symbol, date, high, low,open, close, volume){
    // console.log('------->',type, symbol, date, high, low,open, close, volume);
    const query = `INSERT INTO Notifications_tbl (Type, Symbol, Date, High, Low, [Open], [Close], Volume) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [type, symbol, date, high, low, open, close, volume];

     connectToDB(query, params);
}