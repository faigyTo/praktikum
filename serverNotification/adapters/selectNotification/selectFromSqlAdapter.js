import { connectToDB } from "../../config/DBConfig.js"

export default function selectFromSqlAdapter(config){
	this.selectNotification=(query)=>{
		const query="select * from Notification_tbl"

		let data=connectToDB(config,query,[]);
		return data;
	}
}