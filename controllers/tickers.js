import selectNotificationsFromDB from "../adapters/selectNotification/testSelectFromDB.js"

export const getAllTickers = async (req, res) => {
	let { column,val,type,start,end } = req.query;
	let perPage = req.query.perPage || 15;
	let page = req.query.page;


	try {
		let data = [];
		if(column&&val&&type&&start&&end){
			data=await selectNotificationsFromDB(`select * from Notifications_tbl where [${type}] between ${start} and ${end} and ${column} like '%${val}%`)
		}
		else if (column&&val) {
			data = await selectNotificationsFromDB(`select * from Notifications_tbl where ${column} like '%${val}%'`);
		}
		else if(type&&start&&end){
			data=await selectNotificationsFromDB(`select * from Notifications_tbl where [${type}] between ${start} and ${end}`)
		}		
		else {
			data = await selectNotificationsFromDB("select * from Notifications_tbl");
		} 
		data=data.slice((page-1)*perPage,((page-1)*perPage)+perPage);
		res.json(data);
	}
	catch (err) {
		res.status(500).json({ error: "An error occurred while fetching tickers" });
	}
}


