import { connectToDB } from "../../config/DBConfig.js";

export default function connectSqlAdapter(config) {
	this.saveNotification = (type, symbol, date, high, low, open, close, volume) => {
		const query = `INSERT INTO Notification_tbl (Type, Symbol, Date, High, Low, [Open], [Close], Volume) 
		VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
		const params = [type, symbol, date, high, low, open, close, volume];

		connectToDB(config,query, params);
	}
}