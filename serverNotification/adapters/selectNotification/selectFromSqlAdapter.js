import { connectToDB } from "../../config/DBConfig.js"

export default function selectFromSqlAdapter(config){
	this.selectNotification=(params)=>{
		let {column,val,type,start,end} = params;
		let query="";
		if(column&&val&&type&&start&&end){
			query=`select * from Notification_tbl where [${type}] between ${start} and ${end} and ${column} like '%${val}%'`;
		}
		else if (column&&val) {
			query =`select * from Notification_tbl where ${column} like '%${val}%'`;
		}
		else if(type&&start&&end){
			query=`select * from Notification_tbl where [${type}] between ${start} and ${end}`;
		}		
		else {
			query = "select * from Notification_tbl";
		}

		let data=connectToDB(config,query,[]);
		return data;
	}
}